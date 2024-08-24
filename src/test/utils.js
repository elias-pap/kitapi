/* eslint-disable no-undef */
import {calculatePointsFromTricks} from '../util/otherUtil';

export const checkRound = (checkArray, permutate = true) => {
  const permutateOrRotatePlayers = permutate ? permutatePlayers : rotatePlayers;

  checkArray.map(({input, output}) => {
    permutateOrRotatePlayers(input, output);
  });
};

export const permutatePlayers = (input, output) => {
  const p1Tricks = input[0];
  const p2Tricks = input[1];
  const p3Tricks = input[2];
  const p1Role = input[3];
  const p2Role = input[4];
  const p3Role = input[5];
  const trump = input[6];
  const contract = input[7];
  const p1ExpectedPoints = output[0];
  const p2ExpectedPoints = output[1];
  const p3ExpectedPoints = output[2];

  rotatePlayers(input, output);

  checkPoints(
    p1Tricks,
    p3Tricks,
    p2Tricks,
    p1Role,
    p3Role,
    p2Role,
    trump,
    contract,
    p1ExpectedPoints,
    p3ExpectedPoints,
    p2ExpectedPoints,
  );
  checkPoints(
    p2Tricks,
    p1Tricks,
    p3Tricks,
    p2Role,
    p1Role,
    p3Role,
    trump,
    contract,
    p2ExpectedPoints,
    p1ExpectedPoints,
    p3ExpectedPoints,
  );
  checkPoints(
    p3Tricks,
    p2Tricks,
    p1Tricks,
    p3Role,
    p2Role,
    p1Role,
    trump,
    contract,
    p3ExpectedPoints,
    p2ExpectedPoints,
    p1ExpectedPoints,
  );
};

export const rotatePlayers = (input, output) => {
  const p1Tricks = input[0];
  const p2Tricks = input[1];
  const p3Tricks = input[2];
  const p1Role = input[3];
  const p2Role = input[4];
  const p3Role = input[5];
  const trump = input[6];
  const contract = input[7];
  const p1ExpectedPoints = output[0];
  const p2ExpectedPoints = output[1];
  const p3ExpectedPoints = output[2];

  checkPoints(
    p1Tricks,
    p2Tricks,
    p3Tricks,
    p1Role,
    p2Role,
    p3Role,
    trump,
    contract,
    p1ExpectedPoints,
    p2ExpectedPoints,
    p3ExpectedPoints,
  );
  checkPoints(
    p3Tricks,
    p1Tricks,
    p2Tricks,
    p3Role,
    p1Role,
    p2Role,
    trump,
    contract,
    p3ExpectedPoints,
    p1ExpectedPoints,
    p2ExpectedPoints,
  );
  checkPoints(
    p2Tricks,
    p3Tricks,
    p1Tricks,
    p2Role,
    p3Role,
    p1Role,
    trump,
    contract,
    p2ExpectedPoints,
    p3ExpectedPoints,
    p1ExpectedPoints,
  );
};

export const checkPoints = (
  p1Tricks,
  p2Tricks,
  p3Tricks,
  p1Role,
  p2Role,
  p3Role,
  trump,
  contract,
  p1ExpectedPoints,
  p2ExpectedPoints,
  p3ExpectedPoints,
) => {
  const {p1Points, p2Points, p3Points} = calculatePointsFromTricks(
    p1Tricks,
    p2Tricks,
    p3Tricks,
    p1Role,
    p2Role,
    p3Role,
    trump,
    contract,
  );

  expect(p1Points).toBe(p1ExpectedPoints);
  expect(p2Points).toBe(p2ExpectedPoints);
  expect(p3Points).toBe(p3ExpectedPoints);
};
