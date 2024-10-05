import React from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledDropdown = styled(Dropdown)`
  color: black;
  height: 2.5vh;
`;

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Korean Skincare Brands',
    children: [
      {
        key: '1-1',
        label: <Link to={`/brands/cosrx`}>Cosrx</Link>,
      },
      {
        key: '1-2',
        label: <Link to={`/brands/Face-Shop`}>Face Shop</Link>,
      },
      {
        key: '1-3',
        label: <Link to={`/brands/ONE-THING`}>ONE THING</Link>,
      },
      {
        key: '1-4',
        label: <Link to={`/brands/haruharu-wonder`}>haruharu wonder</Link>,
      },
      {
        key: '1-5',
        label: <Link to={`/brands/Klairs`}>dear,Klairs</Link>,
      },
      {
        key: '1-6',
        label: <Link to={`/brands/Wishtrend`}>Wishtrend</Link>,
      },
    ],
  },
  {
    key: '2',
    label: 'Indian Skincare Brands',
    children: [
      {
        key: '2-1',
        label: <Link to={`/brands/Re-equil`}>Re'equil</Link>,
      }
    ],
  },
  
];

const App: React.FC = () => (
  <StyledDropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space style={{cirsor: 'pointer'}}>
        <div className="underline-hover">Brands</div>
      </Space>
    </a>
  </StyledDropdown>
);

export default App;