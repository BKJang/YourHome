import React, { Component } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProductListActions from '../../redux/modules/productList';

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 80vw;
    height: 75vh;
    background-color: white;
    padding: 10px;

    .category {
        display: flex;
        justify-content: space-between;
        margin: 10px 10px 0px 0px;
        padding: 0px 0px 0px 0px;
        height: 6rem;
        .categoryMain {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 70%;

            .name {
                font-weight: bold;
            }
            .desc {
                color: #808080;
            }
        }
        .categorySub {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30%;
            font-size: 50px;
        }
        .categorySubButton {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 30%;
        }
    }

    .clicked {
        background-color: #000000;
        color: #ffffff;
    }

    .footerContainer {
        padding: 0px 0px 10px 0px;
        width: 100%;
        display: flex;
        // border: solid 1px black;
    }
`;

const MainContainer = styled.div`
    padding: 10px 0px 0px 10px;
    width: 35vw;
    height: 75vh;
    overflow: auto;
`;

const ProductFormContainer = styled.div`
    width: 45vw;
    height: 75vh;
    background-color: white;
    padding: 10px;
    overflow: auto;
    .tableTitle {
        font-size: 1.3rem;
        margin-bottom: 1rem;
    }
`;

const Label = styled.div`
    text-align: left;
    font-size: 1rem;
    font-weight: bold;
    color: #000000;
    margin-bottom: 0.25rem;
    margin-right: 2rem;
    display: inline-block;
    width: 20%;
`;

const Input = styled.input`
    width: 50%;
    border: 1px solid #c2c2c2;
    outline: none;
    border-radius: 3px;
    height: 2em;
    font-size: 0.7rem;
    ::placeholder {
        font-size: 0.7rem;
        color: #7d7d7d;
    }
`;

const SmallButton = styled.button`
    margin-top: 0.5rem;
    border: 2px solid #fe4c8d;
    border-radius: 3px;
    background: white;
    color: #fe4c8d;

    text-align: center;
    font-size: 0.6rem;
    width: 3rem;
    height: 2rem;
    cursor: pointer;
`;

const TableButton = styled.button`
    // margin-top: 0.5rem;
    border: 2px solid #c2c2c2;
    border-radius: 3px;
    background: white;
    color: #fe4c8d;

    text-align: center;
    font-size: 0.6rem;
    width: 3rem;
    height: 2rem;
    cursor: pointer;
`;

const Button = styled.button`
    margin-top: 1rem;
    margin-right: 0.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;

    border: 2px solid #fe4c8d;
    border-radius: 3px;
    background: white;
    color: #fe4c8d;

    text-align: center;
    font-size: 0.8rem;
    width: 8rem;
    cursor: pointer;
    font-weight: bold;
`;

const Table = styled.table`
    border-top: 2px solid #fe4c8d;
    width: 100%;
    border-collapse: collapse;
    font-size: 1rem;
    color: #333;
    table-layout: fixed;
    border-spacing: 0;
    th {
        text-align: center;
        border-right: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        background: #fafafa;
        height: 35px;
        line-height: 18px;
        color: #666666;
        font-size: 1rem;
        padding: 5px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    td {
        border-right: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        padding: 5px;
        line-height: 22px;
        color: #666666;
        font-size: 0.9rem;
        height: 30px;
        box-sizing: border-box;
        letter-spacing: -0.04em;
    }
    .checkboxTd {
        width: 7%;
    }
    .tableAlignCenter {
        text-align: center;
    }
`;
class Imhome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedCate: { index: -1, _id: -1, itemName: '-' },
            newCategory: { state: false, newName: '', newDesc: '' },
            newItem: { state: false, newName: '', newVolume: '', newCost: '' },
            categories: props.categories
        };
    }

    _clickCategory = (index, _id, itemName) =>
        this.setState({ clickedCate: { index: index, _id: _id, itemName: itemName } });

    /**
     * @desc 카테고리를 삭제하는 멧드
     * @param
     * companyCode : 회사 코드
     * body : item id {
     *   _id : item id
     * }
     */
    _deleteCate = async () => {
        const { clickedCate } = this.state;

        if (clickedCate.index === -1) {
            // 클릭한 카테고리가 없다면
            alert('메뉴를 선택해주세요');
        } else {
            if (window.confirm('정말 선택하신 카테고리를 삭제하시겠습니까?')) {
                // 클릭한 카테고리가 있다면
                const { ProductListActions, form } = this.props;

                // 현재 폼에서 companyCode 조회
                const companyCode = form.toJS().companyCode;

                // 카테고리 삭제
                await ProductListActions.deleteCategory(companyCode, {
                    _id: clickedCate._id
                });

                // 클릭 state 초기화
                this.setState({ clickedCate: { index: -1, _id: -1, itemName: '' } });
            }
        }
    };

    // 새로운 카테고리 폼 생성
    _newCategory = () => {
        const { newCategory } = this.state;
        if (!newCategory.state) {
            this.setState({ newCategory: { ...newCategory, state: true } });
        } else {
        }
    };

    /**
     * @desc 카테고리를 생성하는 메서드
     * @param
     * companyCode : 회사 코드
     * body : 카테고리 정보 {
     *   itemName: 이름,
     *   itemDepth: 0,
     *   parentId: 0,
     *   itemDesc: 설명
     *   }
     */
    _createCategory = async () => {
        const { ProductListActions, form } = this.props;
        const { newCategory } = this.state;

        // 현재 폼에서 companyCode 조회
        const companyCode = form.toJS().companyCode;

        // 카테고리 생성
        await ProductListActions.createCategory(companyCode, {
            itemName: newCategory.newName,
            itemDepth: 0,
            parentId: 0,
            itemDesc: newCategory.newDesc
        });

        // 관련 state 초기화
        this.setState({ newCategory: { state: false, newName: '', newDesc: '' } });
    };

    _cancelCategory = () => {
        this.setState({ newCategory: { state: false, newName: '', newDesc: '' } });
    };

    _handleChange = e => {
        const { newCategory } = this.state;
        this.setState({ newCategory: { ...newCategory, [e.target.name]: e.target.value } });
    };

    render() {
        const items = this.props.product.items;
        const { clickedCate, newCategory } = this.state;
        const detailItem = items.filter(item => item.parentId === clickedCate._id);
        const defaultTable = [0, 1, 2, 3, 4];
        return (
            <ContentWrapper>
                <MainContainer>
                    <div className={'productComponent'}>
                        {!!this.props.categories.length > 0 ? (
                            this.props.categories.map((item, index) => (
                                <div
                                    className={
                                        this.state.clickedCate.index === index
                                            ? classNames('category', 'clicked')
                                            : classNames('category')
                                    }
                                    key={index}
                                >
                                    <div className={'categoryMain'}>
                                        <div className={'name'}>{item.itemName}</div>
                                        <div className={'desc'}>{item.itemDesc}</div>
                                    </div>
                                    <div
                                        className={'categorySub'}
                                        onClick={() =>
                                            this._clickCategory(index, item._id, item.itemName)
                                        }
                                    >
                                        <span>
                                            {this.state.clickedCate.index === index ? '>' : '<'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>로딩중입니다...</div>
                        )}
                        {newCategory.state === true ? (
                            <div className={classNames('category')}>
                                <div className={'categoryMain'}>
                                    <div className={'name'}>
                                        <Label>이름</Label>
                                        <Input
                                            type="text"
                                            name="newName"
                                            placeholder="이름"
                                            onChange={this._handleChange}
                                            value={newCategory.newName}
                                        />
                                    </div>
                                    <div className={'desc'}>
                                        <Label>설명</Label>
                                        <Input
                                            type="text"
                                            name="newDesc"
                                            placeholder="설명"
                                            onChange={this._handleChange}
                                            value={newCategory.newDesc}
                                        />
                                    </div>
                                </div>
                                <div className={'categorySubButton'}>
                                    <SmallButton onClick={() => this._createCategory()}>
                                        확인
                                    </SmallButton>
                                    <SmallButton onClick={() => this._cancelCategory()}>
                                        취소
                                    </SmallButton>
                                    {/* <button onClick={() => this._createCategory()}></button> */}
                                </div>
                            </div>
                        ) : (
                            <div />
                        )}
                    </div>
                    <hr />
                    {!!this.props.categories.length > 0 ? (
                        <div className={'footerContainer'}>
                            <Button onClick={() => this._newCategory()}>메뉴추가</Button>
                            <Button onClick={this._deleteCate}>메뉴삭제</Button>
                        </div>
                    ) : (
                        <div />
                    )}
                </MainContainer>
                <ProductFormContainer>
                    <div className={'tableTitle'}>{this.state.clickedCate.itemName}</div>
                    <div>
                        <Table>
                            <tbody>
                                <tr>
                                    <th className={classNames('checkboxTd', 'tableAlignCenter')} />
                                    <th>품목</th>
                                    <th>단위</th>
                                    <th>가격</th>
                                    <th>수정</th>
                                </tr>
                                {!!detailItem.length > 0
                                    ? detailItem.map(child => (
                                          <tr key={child._id}>
                                              <td
                                                  className={classNames(
                                                      'checkboxTd',
                                                      'tableAlignCenter'
                                                  )}
                                              >
                                                  <input type="checkbox" id={child._id} />
                                              </td>
                                              <td>{child.itemName}</td>
                                              <td>{child.itemVolume}</td>
                                              <td>{child.itemCost}</td>
                                              <td className={classNames('tableAlignCenter')}>
                                                  <TableButton>수정</TableButton>
                                              </td>
                                          </tr>
                                      ))
                                    : defaultTable.map((i, index) => (
                                          <tr key={index}>
                                              <td
                                                  className={classNames(
                                                      'checkboxTd',
                                                      'tableAlignCenter'
                                                  )}
                                              >
                                                  <input type="checkbox" id={i} />
                                              </td>
                                              <td>-</td>
                                              <td>-</td>
                                              <td>-</td>
                                              <td>-</td>
                                          </tr>
                                      ))}
                            </tbody>
                        </Table>
                    </div>
                    <hr />
                    <div className={'footerContainer'}>
                        <Button>품목추가</Button>
                        <Button>품목삭제</Button>
                        <Button>변경사항 저장</Button>
                    </div>
                </ProductFormContainer>
            </ContentWrapper>
        );
    }
}

export default connect(
    state => ({
        form: state.productList.getIn(['productList', 'form']),
        lists: state.productList.getIn(['productList', 'lists']),
        error: state.productList.getIn(['productList', 'error']),
        result: state.productList.get('result')
    }),
    dispatch => ({
        ProductListActions: bindActionCreators(ProductListActions, dispatch)
    })
)(Imhome);
