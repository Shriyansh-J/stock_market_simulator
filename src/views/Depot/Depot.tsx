import * as React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import { connect } from "react-redux";
import {
  AppState,
  FinancialSnapshot,
  Stock,
  StockCategoryValue,
} from "../../state/AppState";
import {
  getPossessedStocks,
  getStockCategoryValues,
  getStockValue,
} from "../../state/depot/depotSelector";
import { BalanceCard, StockBalanceCard, StockShareCard } from "./Cards";
import { CapitalDevelopment } from "./Cards/CapitalDevelopment";
import { StockCard } from "./Cards/StockCard";
import { withAuthorization } from "../../firebase/withAuthorization";
import { db } from "../../firebase";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const dbs = firebase.database();

interface DepotProps {
  accountValue: number;
  stockValue: number;
  stockValueDevelopment: FinancialSnapshot[];
  stockCategoryValues: StockCategoryValue[];
  stocks: Stock[];
}

class Depot extends React.Component<DepotProps> {
  constructor(props: any) {
    super(props);

    this.state = {
      users: null,
    };
  }

  public componentDidMount() {
    db.onceGetUsers().then((snapshot) =>
      this.setState(() => ({ users: snapshot.val() }))
    );
    const uid = firebase.auth().currentUser?.uid;
    let finalamt = this.props.accountValue;
    this.props.stocks.map((ele) => {
      finalamt += ele.quantity * ele.value;
    });
    dbs
      .ref("users/" + uid)
      .child("amount")
      .set(finalamt);
  }

  render() {
    const {
      stockCategoryValues,
      accountValue,
      stockValue,
      stockValueDevelopment,
      stocks,
    } = this.props;

    return (
      <div className="content">
        <Grid fluid={true}>
          <Row>
            <Col lg={4} sm={6} xs={12}>
              <BalanceCard value={accountValue} />
            </Col>
            <Col lg={4} sm={6} xs={12}>
              <StockBalanceCard value={stockValue} />
            </Col>
            <Col lg={8} sm={6} xs={12}>
              <CapitalDevelopment values={stockValueDevelopment} />
            </Col>
            {stockCategoryValues.length > 0 && (
              <Col lg={4} sm={6} xs={12}>
                <StockShareCard
                  stockCategoryValues={this.props.stockCategoryValues}
                />
              </Col>
            )}
          </Row>
          {stocks.length > 0 && <hr className="stocktile-hr" />}
          <Row>
            {stocks.map((stock) => {
              return (
                <Col key={stock.name} lg={4} sm={6} xs={12}>
                  <StockCard
                    name={stock.name}
                    price={stock.value}
                    quantity={stock.quantity}
                    type={stock.type}
                  />
                </Col>
              );
            })}
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  accountValue: state.depot.accountValue,
  stockValue: getStockValue(state),
  stockValueDevelopment: state.depot.stockValueDevelopment,
  stockCategoryValues: getStockCategoryValues(state),
  stocks: getPossessedStocks(state),
});

// tslint:disable-next-line: no-any
const mapDispatchToProps = (dispatch: any) => ({});

const authCondition = (authUser: any) => !!authUser;

export default withAuthorization(authCondition)(
  connect(mapStateToProps, mapDispatchToProps)(Depot)
);
