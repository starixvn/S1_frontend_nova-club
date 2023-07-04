import { MaterialTopTab } from 'app/navigation/navigator/MaterialTopTab'

export default function Transfer({}) {
  return (
    <MaterialTopTab>
      <MaterialTopTab.Screen
        name="receive" // This is the name of the page and must match the url from root
      />
      <MaterialTopTab.Screen
        name="id" // This is the name of the page and must match the url from root
      />
      <MaterialTopTab.Screen
        name="qr" // This is the name of the page and must match the url from root
      />
    </MaterialTopTab>
  )
}
