import Icon from 'app/components/Icon'
import BouncePressable from 'app/components/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { Row, Text } from 'dripsy'
import React from 'react'

type PageSwitcherProps = {
  page: number
  setPage: (args0) => void
  maxPage: number
  label: string
}

const PageSwitcher = ({ page, setPage, maxPage, label }: PageSwitcherProps) => {
  const { t } = useLocalization()
  const isStartPage = page === 0
  const isEndPage = page === maxPage

  const handlePrev = () => {
    setPage(isStartPage ? page : page - 1)
  }

  const handleNext = () => {
    setPage(isEndPage ? page : page + 1)
  }

  return (
    <Row
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      {maxPage > 1 && (
        <BouncePressable onPress={handlePrev} disabled={isStartPage}>
          <Icon name="back" sx={{ opacity: isStartPage ? 0.6 : 1 }} />
        </BouncePressable>
      )}

      <Text sx={{ minWidth: 300, textAlign: 'center' }}>{label}</Text>

      {maxPage > 1 && (
        <BouncePressable onPress={handleNext} disabled={isEndPage}>
          <Icon name="next" sx={{ opacity: isEndPage ? 0.6 : 1 }} />
        </BouncePressable>
      )}
    </Row>
  )
}

export default PageSwitcher
