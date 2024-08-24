import {CONTRACT, ROLE, SOLO, TRUMP} from '../other/constants';
import {getPointsPerTrick} from '../util/otherUtil';
import {checkRound} from './utils';

const contract = CONTRACT.ten;
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

const allWinAllPlay = trump => {
  check([10, 0, 0], [10 * ppt(trump), 0 * ppt(trump), 0 * ppt(trump)], trump);
};

const allWinHelp = trump => {
  check(
    [10, 0, 0],
    [10 * ppt(trump), 0 * ppt(trump), 0 * ppt(trump)],
    trump,
    ROLE.helper,
  );
};

const allWinPass = trump => {
  check(
    [10, 0, 0],
    [10 * ppt(trump), 0 * ppt(trump), 0 * ppt(trump)],
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
    [9, 1, 0],
    [-1 * (10 * ppt(trump) + 1 * ppt(trump)), 1 * ppt(trump), 0 * ppt(trump)],
    trump,
  );
};

const playersWinByOneHelp = trump => {
  check(
    [9, 1, 0],
    [-1 * (10 * ppt(trump) + 1 * ppt(trump)), 0 * ppt(trump), 1 * ppt(trump)],
    trump,
    ROLE.helper,
  );
};

const playersWinByOnePass = trump => {
  check(
    [9, 0, 1],
    [-1 * (10 * ppt(trump) + 1 * ppt(trump)), 0 * ppt(trump), 1 * ppt(trump)],
    trump,
    ROLE.pass,
  );
};

const playersWinByManyAllPlay = trump => {
  check(
    [8, 1, 1],
    [
      -1 * (10 * pptSolo(trump) + 2 * pptSolo(trump)),
      1 * pptSolo(trump),
      1 * pptSolo(trump),
    ],
    trump,
  );
  check(
    [8, 2, 0],
    [
      -1 * (10 * pptSolo(trump) + 2 * pptSolo(trump)),
      2 * pptSolo(trump),
      0 * pptSolo(trump),
    ],
    trump,
  );
  check(
    [7, 2, 1],
    [
      -1 * (10 * pptSolo(trump) + 3 * pptSolo(trump)),
      2 * pptSolo(trump),
      1 * pptSolo(trump),
    ],
    trump,
  );
  check(
    [7, 0, 3],
    [
      -1 * (10 * pptSolo(trump) + 3 * pptSolo(trump)),
      0 * pptSolo(trump),
      3 * pptSolo(trump),
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
    [8, 1, 1],
    [
      -1 * (10 * pptSolo(trump) + 2 * pptSolo(trump)),
      0 * pptSolo(trump),
      2 * pptSolo(trump),
    ],
    trump,
    ROLE.helper,
  );
  check(
    [8, 2, 0],
    [
      -1 * (10 * pptSolo(trump) + 2 * pptSolo(trump)),
      0 * pptSolo(trump),
      2 * pptSolo(trump),
    ],
    trump,
    ROLE.helper,
  );
  check(
    [7, 2, 1],
    [
      -1 * (10 * pptSolo(trump) + 3 * pptSolo(trump)),
      0 * pptSolo(trump),
      3 * pptSolo(trump),
    ],
    trump,
    ROLE.helper,
  );
  check(
    [7, 0, 3],
    [
      -1 * (10 * pptSolo(trump) + 3 * pptSolo(trump)),
      0 * pptSolo(trump),
      3 * pptSolo(trump),
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
    [8, 0, 2],
    [
      -1 * (10 * pptSolo(trump) + 2 * pptSolo(trump)),
      0 * pptSolo(trump),
      2 * pptSolo(trump),
    ],
    trump,
    ROLE.pass,
  );
  check(
    [7, 0, 3],
    [
      -1 * (10 * pptSolo(trump) + 3 * pptSolo(trump)),
      0 * pptSolo(trump),
      3 * pptSolo(trump),
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
