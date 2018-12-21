import React, { Component } from 'react';
import HeaderContainer from '../header/HeaderContainer';
import { NavLink } from 'react-router-dom';
import { NavTemplate } from '../nav';
import Content from '../content/ContentContainer';
import ContentTwoDivContainer from '../content/ContentTwoDivContainer';

class PageTemplate extends Component {

    componentDidMount() {
        const { history } = this.props;
        const token = localStorage.getItem('accessToken');
        if (!token) {
            history.push('/login');
            return;
        }
    }

    logout = () => {
        const { history } = this.props;
        localStorage.removeItem('accessToken');
        history.push('/login');
    }

    render() {
        return (
            <div>
                <HeaderContainer>
                    <li>
                        <button onClick={this.logout}>
                            로그아웃
                        </button>
                    </li>
                    <li>
                        <NavLink to="/admin/users" activeClassName="on">
                            회원정보
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/releaselist" activeClassName="on">
                            출고내역조회
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/orderlist" activeClassName="on">
                            주문내역조회
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/product" activeClassName="on">
                            품목관리
                        </NavLink>
                    </li>
                </HeaderContainer>
                <NavTemplate
                    navData={this.props.navData}
                    id={this.props.id}
                    clickNav={this.props.clickNav}
                />
                {!!this.props.children[0] === true && this.props.children[0].type === 'header' ? (
                    <ContentTwoDivContainer>{this.props.children}</ContentTwoDivContainer>
                ) : (
                        <Content>{this.props.children}</Content>
                    )}
            </div>
        );
    }
}

export default PageTemplate;
