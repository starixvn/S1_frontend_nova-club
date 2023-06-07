import useContainerDimension from './useContainerDimension'

const useCheckMobile = () => {
  const { width } = useContainerDimension()
  const isMobile = width <= 768

  return {
    isMobile,
  }
}

export default useCheckMobile
