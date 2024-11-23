import React from 'react';
import styled from 'styled-components';

const RadioStar = () => {
  return (
    <StyledWrapper>
      <div className="rating">
        <input defaultValue={5} name="rate" id="star5" type="radio" />
        <label title="text" htmlFor="star5" />
        <input defaultValue={4} name="rate" id="star4" type="radio" />
        <label title="text" htmlFor="star4" />
        <input defaultValue={3} name="rate" id="star3" type="radio" defaultChecked />
        <label title="text" htmlFor="star3" />
        <input defaultValue={2} name="rate" id="star2" type="radio" />
        <label title="text" htmlFor="star2" />
        <input defaultValue={1} name="rate" id="star1" type="radio" />
        <label title="text" htmlFor="star1" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .rating:not(:checked) > input {
    position: absolute;
    appearance: none;
  }

  .rating:not(:checked) > label {
    float: right;
    cursor: pointer;
    font-size: 30px;
    color: #666;
  }

  .rating:not(:checked) > label:before {
    content: '★';
  }

  .rating > input:checked + label:hover,
  .rating > input:checked + label:hover ~ label,
  .rating > input:checked ~ label:hover,
  .rating > input:checked ~ label:hover ~ label,
  .rating > label:hover ~ input:checked ~ label {
    color: #e58e09;
  }

  .rating:not(:checked) > label:hover,
  .rating:not(:checked) > label:hover ~ label {
    color: #ff9e0b;
  }

  .rating > input:checked ~ label {
    color: #ffa723;
  }`;

export default RadioStar;
