import React from 'react';
import {
  Card, CardContent, Typography, IconButton, Menu, MenuItem,
} from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import FullWidthGrid from './TwoComponentGridSystem';

require('../../styles/Card.scss');

export default function MyCard(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Card className="card-root" variant="outlined">
        <CardContent>
          <FullWidthGrid
            componentOneSize={10}
            componentTwoSize={2}
            spacing={0}
            componentOne={(
              <Typography className="card-title" color="textPrimary">
                {props.heading}
              </Typography>
            )}
            componentTwo={props.showTripleDotMenu && (
              <div>
                <IconButton
                  className="menu-icon"
                  aria-label="manage element"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleClick}
                  color="inherit"
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {
                    props.options && props.options.map((op) => (
                      <MenuItem onClick={() => {
                        handleClose();
                        op.onClick(props.id, props.type);
                      }}
                      >
                        <p>
                          {op.text}
                        </p>
                      </MenuItem>
                    ))
                  }
                </Menu>
              </div>
            )}
          />
          <Typography className="card-content" color="textSecondary">
            {props.content}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
