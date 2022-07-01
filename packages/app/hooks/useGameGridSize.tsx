import { HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from './useContainerDimension'

export default function useGameGridSize(numOfCol = 3) {
  const { width, height } = useContainerDimension()

  const containerSpaceUnits = 1
  const itemSpaceUnits = 1
  const spacePerUnit = width * HOME_PADDING * 0.5

  const totalSpacingUnits =
    numOfCol * itemSpaceUnits * 2 + containerSpaceUnits * 2

  const totalSpaceSize = spacePerUnit * totalSpacingUnits

  const columnWidth = Math.floor((width - totalSpaceSize) / numOfCol)

  return {
    containerSpace: containerSpaceUnits * spacePerUnit,
    itemSpace: itemSpaceUnits * spacePerUnit,
    spacePerUnit,
    contentWidth: columnWidth,
  }
}
