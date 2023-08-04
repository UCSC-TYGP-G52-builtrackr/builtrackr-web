import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { SiteManagers } from '../data/SiteManagers';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function PopoverCE() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = React.useState(null);
  const [tooltipTitle, setTooltipTitle] = React.useState('Name'); // State to store the tooltip title

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const handleListItemClick = (imageUrl) => () => {
  //   setSelectedImageUrl(imageUrl);
  //   setAnchorEl(null);
  // };

  const handleListItemClick = (person) => () => {
    setSelectedImageUrl(person.imageUrl);
    setTooltipTitle(person.name); // Update the tooltip title with the name
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      {/* <img
        className="inline-block w-10 h-10 rounded-full cursor-pointer ring-2 ring-white"
        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt="" onClick={handleClick}
        /> */}
        {/* <div className="inline-block text-4xl cursor-pointer" onClick={handleClick}>
        <AddCircleOutlineIcon fontSize="inherit"/>
        </div> */}

        {/* Conditional rendering based on whether selectedImageUrl is null */}
        {selectedImageUrl ? (
          <Tooltip title={tooltipTitle} placement="right-end">
          <img
            className="inline-block w-10 h-10 mt-2 rounded-full cursor-pointer ring-2 ring-white"
            src={selectedImageUrl}
            alt=""
            onClick={handleClick}
          />
          </Tooltip>
        ) : (
          <div className="inline-block text-4xl cursor-pointer" onClick={handleClick}>
            <AddCircleOutlineIcon fontSize="inherit" />
          </div>
        )}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >

        {/* popover content */}
        <div className="overflow-y-auto max-h-72">
        <Typography sx={{ p: 2 }}>
            <ul role="list" className="divide-y divide-gray-100">
                {/* from the imported sitemanagers dataset */}
                {SiteManagers.map((person) => (
                    <li key={person.email} className="flex justify-between py-5 cursor-pointer gap-x-6" onClick={handleListItemClick(person)}>
                    <div className="flex min-w-0 gap-x-4">
                        <img className="flex-none w-12 h-12 rounded-full bg-gray-50" src={person.imageUrl} alt="" />
                        <div className="flex-auto min-w-0">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                        <p className="mt-1 text-xs leading-5 text-gray-500 truncate">{person.email}</p>
                        </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                        {person.lastSeen ? (
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                            Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                        </p>
                        ) : (
                        <div className="mt-1 flex items-center gap-x-1.5">
                            <div className="flex-none p-1 rounded-full bg-emerald-500/20">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            </div>
                            <p className="text-xs leading-5 text-gray-500">Online</p>
                        </div>
                        )}
                    </div>
                    </li>
                ))}
            </ul>
        </Typography>
        </div>
      </Popover>
    </div>
  );
}