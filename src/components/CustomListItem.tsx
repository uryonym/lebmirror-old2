import { ListItem } from '@chakra-ui/react'
import { FC } from 'react'

const CustomListItem: FC = ({ children }) => (
  <ListItem
    className="list-item"
    paddingY="0.5rem"
    borderBottom="1px solid #333"
  >
    { children }
  </ListItem>
)

export default CustomListItem
