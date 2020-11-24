import styled from '@emotion/styled';

export const Form = styled.form`
    margin:5rem auto;
    width:40rem;
    max-width:100%;
    border-radius:1rem;
    padding:2rem;
    background: var(--black);
    box-shadow:3px 3px 8px black, -3px -3px 8px rgba(255,255,255,.16);
`

export const Campo = styled.div`
    margin-bottom:2rem;

    label{
        font-size:12px;
    }

    input, textarea{
        overflow:hidden;
        padding:1rem 0;
        width:100%;
        border:none;
        border-bottom:1px solid var(--gris1);
        outline:none;
        color:white;
        background-color: transparent;
        transition:.3s;

        :focus{
            padding:1rem;
            transition:.3s;
            border-bottom:1px solid var(--primary);
        }
    }

    /* input[type=file]{
        background-color: #fff;
        color:red;
    } */

    textarea{
        height:5rem;
    }
`

export const InputSubmit = styled.input`
    width:100%;
    height:4rem;
    border:none;
    outline:none;
    background-color: var(--primary);
    border-radius:1rem;
    color:white;
    cursor:pointer;
`

export const Error = styled.p`
    color:#DD2727;
    font-size:12px;
    font-weight:700;
`