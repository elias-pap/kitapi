import {CONTRACT, ROLE, SOLO, TRUMP} from '../other/constants';
import {getPointsPerTrick} from '../util/otherUtil';
import {checkRound} from './utils';

const contract = CONTRACT.six;
const ppt = trump => getPointsPerTrick(contract, trump);
const pptSolo = trump => ppt(trump) * SOLO;

test(`${contract}`, () => {
  const trumps = [
    TRUMP.spades,
    TRUMP.clubs,
    TRUMP.diamonds,
    TRUMP.hearts,
    TRUMP.noTrump,
  ];
  trumps.map(trump => {
    allWin(trump);
    playersWin(trump);
    bidderWin(trump);
  });
});

const allWin = trump => {
  allWinAllPlay(trump);
  allWinHelp(trump);
  allWinPass(trump);
};

const playersWin = trump => {
  playersWinByOne(trump);
  playersWinByMany(trump);
};

const playersWinByOne = trump => {
  playersWinByOneAllPlay(trump);
  playersWinByOneHelp(trump);
  playersWinByOnePass(trump);
};

const playersWinByMany = trump => {
  playersWinByManyAllPlay(trump);
  playersWinByManyHelp(trump);
  playersWinByManyPass(trump);
};

const bidderWin = trump => {
  bidderWinByOne(trump);
  bidderWinByMany(trump);
};

const bidderWinByOne = trump => {
  bidderWinByOneAllPlay(trump);
  bidderWinByOneHelp(trump);
  bidderWinByOnePass(trump);
};

const bidderWinByMany = trump => {
  bidderWinByManyAllPlay(trump);
  bidderWinByManyHelp(trump);
  bidderWinByManyPass(trump);
};

const allWinAllPlay = trump => {
  check([6, 2, 2], [6 * ppt(trump), 2 * ppt(trump), 2 * ppt(trump)], trump);
  check([6, 3, 1], [6 * ppt(trump), 3 * ppt(trump), 1 * ppt(trump)], trump);
  check([6, 4, 0], [6 * ppt(trump), 4 * ppt(trump), 0 * ppt(trump)], trump);
};

const allWinHelp = trump => {
  check(
    [6, 2, 2],
    [6 * ppt(trump), 0 * ppt(trump), 4 * ppt(trump)],
    trump,
    ROLE.helper,
  );
  check(
    [6, 3, 1],
    [6 * ppt(trump), 0 * ppt(trump), 4 * ppt(trump)],
    trump,
    ROLE.helper,
  );
  check(
    [6, 4, 0],
    [6 * ppt(trump), 0 * ppt(trump), 4 * ppt(trump)],
    trump,
    ROLE.helper,
  );
};

const allWinPass = trump => {
  check(
    [8, 0, 2],
    [8 * ppt(trump), 0 * ppt(trump), 2 * ppt(trump)],
    trump,
    ROLE.pass,
  );
  check(
    [7, 0, 3],
    [7 * ppt(trump), 0 * ppt(trump), 3 * ppt(trump)],
    trump,
    ROLE.pass,
  );
  check(
    [6, 0, 4],
    [6 * ppt(trump), 0 * ppt(trump), 4 * ppt(trump)],
    trump,
    ROLE.pass,
  );
  check(
    [10, 0, 0],
    [10 * ppt(trump), 0 * ppt(trump), 0 * ppt(trump)],
    trump,
    ROLE.pass,
    ROLE.pass,
  );
};

const playersWinByOneAllPlay = trump => {
  check(
    [5, 3, 2],
    [-1 * (10 * ppt(trump) + 5 * ppt(trump)), 3 * ppt(trump), 2 * ppt(trump)],
    trump,
  );
  check(
    [5, 4, 1],
    [-1 * (10 * ppt(trump) + 5 * ppt(trump)), 4 * ppt(trump), 1 * ppt(trump)],
    trump,
  );
  check(
    [5, 5, 0],
    [-1 * (10 * ppt(trump) + 5 * ppt(trump)), 5 * ppt(trump), 0 * ppt(trump)],
    trump,
  );
};

const playersWinByOneHelp = trump => {
  check(
    [5, 3, 2],
    [-1 * (10 * ppt(trump) + 5 * ppt(trump)), 0 * ppt(trump), 5 * ppt(trump)],
    trump,
    ROLE.helper,
  );
  check(
    [5, 4, 1],
    [-1 * (10 * ppt(trump) + 5 * ppt(trump)), 0 * ppt(trump), 5 * ppt(trump)],
    trump,
    ROLE.helper,
  );
  check(
    [5, 5, 0],
    [-1 * (10 * ppt(trump) + 5 * ppt(trump)), 0 * ppt(trump), 5 * ppt(trump)],
    trump,
    ROLE.helper,
  );
};

const playersWinByOnePass = trump => {
  check(
    [5, 0, 5],
    [-1 * (10 * ppt(trump) + 5 * ppt(trump)), 0 * ppt(trump), 5 * ppt(trump)],
    trump,
    ROLE.pass,
  );
};

const playersWinByManyAllPlay = trump => {
  check(
    [4, 3, 3],
    [
      -1 * (10 * pptSolo(trump) + 6 * pptSolo(trump)),
      3 * pptSolo(trump),
      3 * pptSolo(trump),
    ],
    trump,
  );
  check(
    [4, 6, 0],
    [
      -1 * (10 * pptSolo(trump) + 6 * pptSolo(trump)),
      6 * pptSolo(trump),
      0 * pptSolo(trump),
    ],
    trump,
  );
  check(
    [3, 4, 3],
    [
      -1 * (10 * pptSolo(trump) + 7 * pptSolo(trump)),
      4 * pptSolo(trump),
      3 * pptSolo(trump),
    ],
    trump,
  );
  check(
    [3, 2, 5],
    [
      -1 * (10 * pptSolo(trump) + 7 * pptSolo(trump)),
      2 * pptSolo(trump),
      5 * pptSolo(trump),
    ],
    trump,
  );
  check(
    [0, 5, 5],
    [
      -1 * (10 * pptSolo(trump) + 10 * pptSolo(trump)),
      5 * pptSolo(trump),
      5 * pptSolo(trump),
    ],
    trump,
  );
};

const playersWinByManyHelp = trump => {
  check(
    [4, 3, 3],
    [
      -1 * (10 * pptSolo(trump) + 6 * pptSolo(trump)),
      0 * pptSolo(trump),
      6 * pptSolo(trump),
    ],
    trump,
    ROLE.helper,
  );
  check(
    [4, 6, 0],
    [
      -1 * (10 * pptSolo(trump) + 6 * pptSolo(trump)),
      0 * pptSolo(trump),
      6 * pptSolo(trump),
    ],
    trump,
    ROLE.helper,
  );
  check(
    [3, 4, 3],
    [
      -1 * (10 * pptSolo(trump) + 7 * pptSolo(trump)),
      0 * pptSolo(trump),
      7 * pptSolo(trump),
    ],
    trump,
    ROLE.helper,
  );
  check(
    [3, 2, 5],
    [
      -1 * (10 * pptSolo(trump) + 7 * pptSolo(trump)),
      0 * pptSolo(trump),
      7 * pptSolo(trump),
    ],
    trump,
    ROLE.helper,
  );
  check(
    [0, 5, 5],
    [
      -1 * (10 * pptSolo(trump) + 10 * pptSolo(trump)),
      0 * pptSolo(trump),
      10 * pptSolo(trump),
    ],
    trump,
    ROLE.helper,
  );
};

const playersWinByManyPass = trump => {
  check(
    [4, 0, 6],
    [
      -1 * (10 * pptSolo(trump) + 6 * pptSolo(trump)),
      0 * pptSolo(trump),
      6 * pptSolo(trump),
    ],
    trump,
    ROLE.pass,
  );
  check(
    [3, 0, 7],
    [
      -1 * (10 * pptSolo(trump) + 7 * pptSolo(trump)),
      0 * pptSolo(trump),
      7 * pptSolo(trump),
    ],
    trump,
    ROLE.pass,
  );
  check(
    [0, 0, 10],
    [
      -1 * (10 * pptSolo(trump) + 10 * pptSolo(trump)),
      0 * pptSolo(trump),
      10 * pptSolo(trump),
    ],
    trump,
    ROLE.pass,
  );
};

const bidderWinByOneAllPlay = trump => {
  check([7, 1, 2], [7 * ppt(trump), -9 * ppt(trump), 2 * ppt(trump)], trump);
  check([7, 3, 0], [7 * ppt(trump), 3 * ppt(trump), -10 * ppt(trump)], trump);
};

const bidderWinByOneHelp = trump => {
  check(
    [7, 1, 2],
    [7 * ppt(trump), 0 * ppt(trump), -7 * ppt(trump)],
    trump,
    ROLE.helper,
  );
  check(
    [7, 3, 0],
    [7 * ppt(trump), 0 * ppt(trump), -7 * ppt(trump)],
    trump,
    ROLE.helper,
  );
};

const bidderWinByOnePass = trump => {
  check(
    [9, 0, 1],
    [9 * ppt(trump), 0 * ppt(trump), -9 * ppt(trump)],
    trump,
    ROLE.pass,
  );
};

const bidderWinByManyAllPlay = trump => {
  check([8, 1, 1], [18 * ppt(trump), -9 * ppt(trump), -9 * ppt(trump)], trump);
  check(
    [8, 2, 0],
    [8 * pptSolo(trump), 2 * pptSolo(trump), -10 * pptSolo(trump)],
    trump,
  );
  check(
    [9, 1, 0],
    [
      9 * ppt(trump) + 10 * pptSolo(trump),
      -9 * ppt(trump),
      -10 * pptSolo(trump),
    ],
    trump,
  );
  check(
    [10, 0, 0],
    [
      10 * pptSolo(trump) + 10 * pptSolo(trump),
      -10 * pptSolo(trump),
      -10 * pptSolo(trump),
    ],
    trump,
  );
};

const bidderWinByManyHelp = trump => {
  check(
    [8, 1, 1],
    [18 * ppt(trump), 0 * ppt(trump), -18 * ppt(trump)],
    trump,
    ROLE.helper,
  );
  check(
    [8, 2, 0],
    [8 * pptSolo(trump), 0 * pptSolo(trump), -8 * pptSolo(trump)],
    trump,
    ROLE.helper,
  );
  check(
    [9, 1, 0],
    [
      9 * ppt(trump) + 10 * pptSolo(trump),
      0 * ppt(trump),
      -9 * ppt(trump) + -10 * pptSolo(trump),
    ],
    trump,
    ROLE.helper,
  );
  check(
    [10, 0, 0],
    [
      10 * pptSolo(trump) + 10 * pptSolo(trump),
      0 * pptSolo(trump),
      -20 * pptSolo(trump),
    ],
    trump,
    ROLE.helper,
  );
};

const bidderWinByManyPass = trump => {
  check(
    [9, 0, 1],
    [9 * ppt(trump), 0 * ppt(trump), -9 * ppt(trump)],
    trump,
    ROLE.pass,
  );
  check(
    [10, 0, 0],
    [10 * pptSolo(trump), 0 * pptSolo(trump), -10 * pptSolo(trump)],
    trump,
    ROLE.pass,
  );
};

const check = (
  input,
  output,
  trump,
  p2Role = ROLE.player,
  p3Role = ROLE.player,
) => {
  checkRound([
    {
      input: [
        input[0],
        input[1],
        input[2],
        ROLE.bidder,
        p2Role,
        p3Role,
        contract,
        trump,
      ],
      output: [output[0], output[1], output[2]],
    },
  ]);
};
