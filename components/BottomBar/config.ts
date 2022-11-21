export type MenuType = {
  title: string;
  path: string;
};

const baseChallenge = '/challenge';

export const routePath = {
  challengeList: baseChallenge + '/all',
  onGoingList: baseChallenge + '/ongoings',
  achivementList: baseChallenge + '/achivements',
};
export const menus: MenuType[] = [
  { title: '🔥', path: routePath.challengeList },
  { title: '🏃', path: routePath.onGoingList },
  { title: '🥇', path: routePath.achivementList },
];
