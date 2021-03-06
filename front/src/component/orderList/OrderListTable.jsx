import React from 'react';
import styled from 'styled-components';
import { OrderListTableList, OrderListTableTotal } from './';
import classNames from 'classnames';

const ContentWrapper = styled.div`
    width: 35vw;
    height: 75vh;
    background-color: #fe4c8d;
    padding: 10px;

    .dashedContainer {
        border: 1px dashed white;
        height: 100%;
    }

    .mainContainer {
        padding: 30px 60px 0px 60px;
        height: calc(100% - 100px);
    }

    .buttonContainer {
        display: flex;
        padding: 0px 40px 30px 40px;
        height: 60px;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: space-around;
    }
`;

const Header = styled.h3`
    color: white;
    padding: 0px 0px 0px 10px;
    margin: 0px;
`;

const OrderTable = styled.div`
    color: white;
    width: 100%;
    height: calc(100% - 50px);

    .thead {
        display: block;
        padding: 10px;
        width: calc(100% - 20px);
        height: 21px;
    }

    .theadTh {
        display: inline-block;
        text-align: left;
        font-weight: 700;

        :nth-of-type(1) {
            width: 50%;
        }

        :nth-of-type(2) {
            width: 20%;
        }

        :nth-of-type(3) {
            width: 30%;
        }
    }

    .tbody {
        display: block;
        width: calc(100% - 20px);
        height: calc(80% - 20px);
        padding: 10px;
    }

    .tbodyTr {
        display: block;
    }

    .tbodyTd {
        display: inline-block;
        text-align: left;
        border-collapse: collapse;
        color: rgba(255, 255, 255, 0.6);

        :nth-of-type(1) {
            width: 50%;
        }

        :nth-of-type(2) {
            width: 20%;
        }

        :nth-of-type(3) {
            width: 30%;
        }
    }

    .footerTr {
        display: block;
        width: calc(100% - 20px);
        padding: 10px;
    }

    .footerTd {
        display: inline-block;
        text-align: left;
        font-size: 18px;
        font-weight: 500;

        :nth-of-type(1) {
            width: 65%;
        }

        :nth-of-type(2) {
            width: 35%;
        }
    }

    .underLineDash {
        border-bottom: 1px dashed white;
    }

    .text-center {
        text-align: center;
    }
`;

const Button = styled.button`
    color: #fe4c8d;
    background-color: white;
    border: 0px;
    border-radius: 3px;
    font-size: 18px;
    font-weight: 800;
    max-height: 40px;
    padding: 5px 15px;
    cursor: pointer;
`;

const OrderListTable = ({ branchName, orderList, buttonList, clickComplete }) => (
    <ContentWrapper>
        <div className={'dashedContainer'}>
            <div className={'mainContainer'}>
                <Header>{branchName} 주문내역</Header>
                <OrderTable>
                    <Thead />
                    <OrderListTableList orderList={orderList} />
                    <OrderListTableTotal totalCost={calTotalCost(orderList)} />
                </OrderTable>
            </div>
            <Buttons buttonList={buttonList} clickComplete={clickComplete} />
        </div>
    </ContentWrapper>
);

/**
 * @summary 주문내역 총 가격 계산
 * @param orderList
 */
const calTotalCost = orderList => {
    return orderList instanceof Array
        ? orderList.reduce((total, order) => {
              return parseInt(order.itemCount, 10) * parseInt(order.itemCost, 10) + total;
          }, 0)
        : 0;
};

const Thead = () => (
    <div className={classNames('thead', 'underLineDash')}>
        <div className={classNames('theadTh')}>PRODUCT</div>
        <div className={classNames('theadTh', 'text-center')}>수량</div>
        <div className={classNames('theadTh')}>단가</div>
    </div>
);

const Buttons = ({ buttonList, clickComplete }) => (
    <div className={'buttonContainer'}>
        {buttonList.map((button, index) => {
            return index === 1 ? (
                <Button key={index} onClick={() => clickComplete()}>{`${button.name}`}</Button>
            ) : (
                <Button key={index}>{`${button.name}`}</Button>
            );
        })}
    </div>
);

export default OrderListTable;
