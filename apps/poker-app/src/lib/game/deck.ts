export type DeckScaleType =
  | 'standard'
  | 'origin'
  | 'fibonacci'
  | 'tShirts'
  | 'progression'
  | 'linear'
  | 'colors'

export type DeckCardType = number // | { title: string; value: number }

const standard = {
  slug: 'standard',
  name: 'Standard',
  desc: 'The standard scale has give birth to a modified Fibonacci suite.',
  deck: [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100],
}

const origin = {
  slug: 'origin',
  name: 'Original',
  desc: 'The original scale has give birth to a modified Fibonacci suite (0,1,2,3,5,8,13,21, 40, 80,100) that removes the sometimes unnecessary precision level of the higher numbers.',
  deck: [0, 1, 2, 3, 5, 8, 13, 21, 40, 80, 100],
}

const fibonacci = {
  slug: 'fibonacci',
  name: 'Fibonacci',
  desc: 'the most common scale used for planning poker, because it proposes good estimation ranges for both small (in the first part) and large stories (in the upper scale numbers).',
  deck: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
}

// const tShirts = {
//   slug: 'tShirts',
//   name: 'T-Shirts',
//   desc: 'The t-shirt scale (XXS, XS, S, M, L, XL, XXL) provides a smaller and easier, non-mathematical, scale for Scrum teams that are examining the complexity of the backlog items. T-shirt size is also a concept that can be integrated by all team members. It makes the estimations less related to traditional project management effort metrics like man/days, which is good for people that are switching from more traditional project management planing approaches. Depending on the composition and interests of the Scrum team members, other non-numerical scales can be adopted, like beer or coffee drinking sizes.',
//   deck: [
//     {
//       title: 'XXS',
//       value: 0,
//     },
//     {
//       title: 'XS',
//       value: 1,
//     },
//     {
//       title: 'S',
//       value: 2,
//     },
//     {
//       title: 'M',
//       value: 3,
//     },
//     {
//       title: 'L',
//       value: 5,
//     },
//     {
//       title: 'XL',
//       value: 8,
//     },
//     {
//       title: 'XXL',
//       value: 13,
//     },
//   ],
// }

const progression = {
  slug: 'progression',
  name: 'Progression',
  desc: 'The progression numerical scale (0, 1, 2, 4, 6, 8, 16, 32, 64) offers a more radical way than the Fibonacci suite to make the difference between the size of the backlog items. The gap between the scale items can influence estimators in making more varied decisions.',
  deck: [0, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512],
}

const linear = {
  slug: 'linear',
  name: 'Linear',
  desc: 'In a similar way than the t-shirt scale, the linear scale (0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10) propose a simple and linear way to classify the backlog items. It might be easier to grasp than the Fibonacci scale, but it is more difficult to detect very large user stories that maybe should be broken in smaller items.',
  deck: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
}

const decks = [
  standard,
  origin,
  fibonacci,
  // tShirts,
  progression,
  linear,
]

export const decksMap = new Map(decks.map((d) => [d.slug.toLowerCase(), d]))

export const getDeck = (name: DeckScaleType = 'standard') => {
  const t = decksMap.get(name)?.deck || []
  return t as DeckCardType[]
}

export const deck = getDeck()
