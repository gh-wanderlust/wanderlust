import React from 'react';
import styled from 'styled-components';
import { Select } from 'antd';

const { Option } = Select;


interface CitySelectProps {
  handleChange: (e: any) => void;
  value: string;
}

const CitySelect = (props: CitySelectProps) => {
  return (
      <Select 
        onChange={props.handleChange}
        defaultValue="Chicago"
        style={{ width: '200px' }}
      >
        <Option value="chicago">Chicago</Option>
        <Option value="montpelier">Montpelier</Option>
        <Option value="miami">Miami</Option>
      </Select>
  );
};

export default CitySelect;

const Wrapper = styled.div``

// const SelectInput = styled.select`
//   display: block;
//   font-size: 17px;
//   font-weight: 700;
//   color: white;
//   line-height: 1.3;
//   width: 15vw;
//   max-width: 100%;
//   box-sizing: border-box;
//   margin: 0;
//   border: 0;
//   border-radius: 0.5em;
//   background: none;
//   text-decoration: underline;
//   width: max-content;
//   margin-left: 2vw;
//   font-family: 'Work Sans';
//   font-weight: 200;
//   font-size: 25px;
//   appearance: none;


//   ::after {
//     content: 'v';
//   }
// `;
