import styled from '@emotion/styled';

const Button = styled.a`
    border:none;
    outline:none;
    padding: .5rem 2rem;
    border-radius:1rem;
    margin-right:1rem;
    /* background-color: ${props => props.bgColor ? 'var(--secondary)' : 'white'}; */
    background-color: var(--black);
    box-shadow:3px 3px 4px black, -3px -3px 4px rgba(255,255,255,.16);
    color: ${props => props.bgColor ? 'black' : 'white'};
    cursor:pointer;
    transition:.3s;

    :hover{
        background-color: #000;
        box-shadow: 0 0 8px rgba(255,255,255,.16);
    }

    &:last-of-type{
        margin-right:0;
    }
`

export default Button