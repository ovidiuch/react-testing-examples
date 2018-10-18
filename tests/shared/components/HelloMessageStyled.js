import styled from 'styled-components';

export const HelloMessageStyled = ({ name }) => (
  <Container>Hello {name}</Container>
);

export const Container = styled.span`
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
`;
