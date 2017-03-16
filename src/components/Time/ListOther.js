import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';

import Divider from 'material-ui/Divider';

/**
 * Simple Icon Menus demonstrating some of the layouts possible using the `anchorOrigin` and
 * `targetOrigin` properties.
 */
const OtherLIst = ({
  totals
}) => (
  <div>
    <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      {totals.map((row, index) => (
        <MenuItem key={index} primaryText={<span>{row.name} <b>-</b> {row.value}</span>} />
      ))}
      <Divider/>
      <MenuItem primaryText="Close" />
    </IconMenu>
  </div>
);

OtherLIst.propTypes = {
  totals: React.PropTypes.array
};

export default OtherLIst;
