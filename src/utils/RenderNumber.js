import {
  Svg1,
  Svg2,
  Svg3,
  Svg4,
  Svg5,
  Svg6,
  Svg7,
  Svg8,
  Svg9,
  Svg10
} from './svg/Numbers'

export const renderNumber = number => {
  switch (number) {
    case 1:
      return <Svg1 />

    case 2:
      return <Svg2 />

    case 3:
      return <Svg3 />

    case 4:
      return <Svg4 />

    case 5:
      return <Svg5 />

    case 6:
      return <Svg6 />

    case 7:
      return <Svg7 />

    case 8:
      return <Svg8 />

    case 9:
      return <Svg9 />

    case 10:
      return <Svg10 />

    default:
      return <Svg1 />
  }
}
