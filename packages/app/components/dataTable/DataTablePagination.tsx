import { styled, SxProp, View } from 'dripsy'
import * as React from 'react'
import { Button } from 'react-native'

export type Props = React.ComponentPropsWithRef<typeof View> &
  PaginationControlsProps &
  PaginationDropdownProps & {
    /**
     * Label text to display which indicates current pagination.
     */
    label?: React.ReactNode
    /**
     * AccessibilityLabel for `label`.
     */
    accessibilityLabel?: string
    /**
     * Label text for select page dropdown to display.
     */
    selectPageDropdownLabel?: React.ReactNode
    /**
     * AccessibilityLabel for `selectPageDropdownLabel`.
     */
    selectPageDropdownAccessibilityLabel?: string
    containerStyle?: SxProp
  }

type PaginationDropdownProps = {
  /**
   * The current number of rows per page.
   */
  numberOfItemsPerPage?: number
  /**
   * Options for a number of rows per page to choose from.
   */
  numberOfItemsPerPageList?: Array<number>
  /**
   * The function to set the number of rows per page.
   */
  onItemsPerPageChange?: (numberOfItemsPerPage: number) => void
}

type PaginationControlsProps = {
  /**
   * The currently visible page (starting with 0).
   */
  page: number
  /**
   * The total number of pages.
   */
  numberOfPages: number
  /**
   * Function to execute on page change.
   */
  onPageChange: (page: number) => void
  /**
   * Whether to show fast forward and fast rewind buttons in pagination. False by default.
   */
  showFastPaginationControls?: boolean
}

const PaginationControls = ({
  page,
  numberOfPages,
  onPageChange,
}: PaginationControlsProps) => {
  return (
    <>
      <Button
        title="Previous"
        disabled={page === 0}
        onPress={() => onPageChange(page - 1)}
      />
      <Button title={`${page}`} onPress={() => onPageChange(page)} />
      {page + 1 <= numberOfPages ? (
        <Button title={`${page + 1}`} onPress={() => onPageChange(page + 1)} />
      ) : null}
      {page + 2 <= numberOfPages ? (
        <Button title={`${page + 2}`} onPress={() => onPageChange(page + 2)} />
      ) : null}
      <Button
        title="Next"
        disabled={numberOfPages === 0 || page === numberOfPages - 1}
        onPress={() => onPageChange(page + 1)}
      />
    </>
  )
}

/**
 * A component to show pagination for data table.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/data-table-pagination.png" />
 *   </figure>
 * </div>
 *
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { DataTable } from 'react-native-paper';
 *
 * const numberOfItemsPerPageList = [2, 3, 4];
 *
 * const items = [
 *   {
 *     key: 1,
 *     name: 'Page 1',
 *   },
 *   {
 *     key: 2,
 *     name: 'Page 2',
 *   },
 *   {
 *     key: 3,
 *     name: 'Page 3',
 *   },
 * ];
 *
 * const MyComponent = () => {
 *   const [page, setPage] = React.useState(0);
 *   const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
 *   const from = page * numberOfItemsPerPage;
 *   const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);
 *
 *   React.useEffect(() => {
 *      setPage(0);
 *   }, [numberOfItemsPerPage]);
 *
 *   return (
 *     <DataTable>
 *       <DataTable.Pagination
 *         page={page}
 *         numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
 *         onPageChange={page => setPage(page)}
 *         label={`${from + 1}-${to} of ${items.length}`}
 *         showFastPaginationControls
 *         numberOfItemsPerPageList={numberOfItemsPerPageList}
 *         numberOfItemsPerPage={numberOfItemsPerPage}
 *         onItemsPerPageChange={onItemsPerPageChange}
 *         selectPageDropdownLabel={'Rows per page'}
 *       />
 *     </DataTable>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const DataTablePagination = ({
  label,
  accessibilityLabel,
  page,
  numberOfPages,
  onPageChange,
  containerStyle,
  showFastPaginationControls = false,
  numberOfItemsPerPageList,
  numberOfItemsPerPage,
  onItemsPerPageChange,
  selectPageDropdownLabel,
  selectPageDropdownAccessibilityLabel,
  ...rest
}: Props) => {
  return (
    <PaginationView
      {...rest}
      sx={containerStyle}
      accessibilityLabel="pagination-container"
    >
      <View sx={{ flexDirection: 'row' }}>
        <PaginationControls
          showFastPaginationControls={showFastPaginationControls}
          onPageChange={onPageChange}
          page={page}
          numberOfPages={numberOfPages}
        />
      </View>
    </PaginationView>
  )
}

DataTablePagination.displayName = 'DataTable.Pagination'

const PaginationView = styled(View)({
  justifyContent: 'flex-end',
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: 16,
  flexWrap: 'wrap',
})

export default DataTablePagination

// @component-docs ignore-next-line
export { DataTablePagination }
