import * as React from 'react';
import { AppState, Stock } from '../../state/AppState';
import { connect } from 'react-redux';
import { Col, Grid, Row } from 'react-bootstrap';
import StockCard from './Cards/StockCard';
import { buyOrSellStock } from '../../state/stockMarket/stockMarketActions';

interface MarketProps {
    stocks: Stock[];
    buy: (stock: string, amount: number) => void;
    sell: (stock: string, amount: number) => void;
}

interface MarketState {
}

class Market extends React.Component<MarketProps, MarketState> {

    constructor( props: MarketProps ) {
        super( props );
    }

    render() {
        const {stocks, buy, sell} = this.props;

        return (
            <div className="content">
                <Grid fluid={true}>
                    <Row>
                        <Col sm={6}>
                            <StockCard
                                stock={stocks[0]}
                                onBuy={() => {
                                buy(stocks[0].name, 1);
                                }}
                                onSell={() => {
                                    sell(stocks[0].name, 1);
                                }}
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = ( state: AppState ) => ({
    stocks: state.stockMarket.stocks
});

// tslint:disable-next-line: no-any
const mapDispatchToProps = ( dispatch: any ) => ({
    buy: ( stock: string, amount: number ) =>
        dispatch( buyOrSellStock( stock, amount ) ),
    sell: ( stock: string, amount: number ) =>
        dispatch( buyOrSellStock( stock, -amount ) ),
});

export default connect( mapStateToProps, mapDispatchToProps )( Market );
