// @flow

import React from 'react';
import styled from 'styled-components';
import svgMarkGithug from '../../svg/mark-github.svg';

export function GithubLink() {
  return (
    <Link
      target="_blank"
      href="https://github.com/skidding/react-testing-examples"
    >
      Open Source
    </Link>
  );
}

const Link = styled.a`
  margin-left: 16px;
  padding-left: 24px;
  font-weight: 500;
  color: #000;
  text-decoration: none;
  background: url(${svgMarkGithug});
    no-repeat;
  background-size: 20px;
  background-position: 0 2px;
  background-repeat: no-repeat;
  opacity: 0.7;

  :hover {
    text-decoration: underline;
  }
`;
