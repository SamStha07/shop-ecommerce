import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: auto;
  max-width: 500px;
  opacity: 0.8;
  margin-top: 2rem;
  .contact-form {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    .formInput {
      vertical-align: middle;
      margin: 10px;
      padding: 10px;
      width: 100%;
      border: 2px solid green;
      background: transparent;
      border-radius: 4px;
      color: white;
      &:focus {
        outline: none;
        box-shadow: 0 0 10px green;
      }
    }
    .formInput.message {
      height: 7rem;
    }
    .errorMessage {
      position: relative;
      color: red;
      opacity: 0.9;
      font-size: 0.8rem;
    }
    .submit-btn {
      width: 100%;
      margin: 10px;
      background: black;
      border: 2px solid green;
      border-radius: 4px;
      color: white;
      font-size: 1.3rem;
      padding: 0.25em;
      cursor: pointer;
      span {
        opacity: 0.5;
        &:hover {
          opacity: 0.8;
        }
      }
      &:hover {
        transition: 0.5s ease-in;
        opacity: 1;
      }
    }
  }
  /* < 830px */
  @media (max-width: 400px) {
    .contact-form {
      .errorMessage {
        font-size: 0.6rem;
      }
      .submit-btn {
        font-size: 1rem;
      }
    }
  }
`;
