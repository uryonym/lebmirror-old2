import { ListItem, ListItemProps } from '@chakra-ui/react'
import { FC } from 'react'

const CustomListItem: FC<ListItemProps> = (props) => (
  <ListItem
    className="list-item"
    paddingY="0.5rem"
    borderBottom="1px solid #333"
    {...props}
  />
)

export default CustomListItem
