import { useCallback, useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, styled } from '@mui/material';
import { ArrowBack, Search } from '@mui/icons-material';
import useDebounce from '../hooks/useDebounce';
import { useSearchContext } from '../contexts/SearchContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const StyledToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const SearchBarContainer = styled('div')(({ theme, open }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'start',
  backgroundColor: 'transparent !important',
  borderRadius: theme.shape.borderRadius,
  transition: 'width 0.3s ease',
  width: open ? '150px' : '40px',
  overflow: 'hidden',
  marginRight: '20px',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 0),
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { setSearchTerm, title } = useSearchContext();
  const debouncedSearchTerm = useDebounce(inputValue, 500);
  const navigate = useNavigate(); 
  const handleSearchClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchTerm]);

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      sx={{
        background:
          'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 100%)',
        backgroundBlendMode: 'blur(50px)',
      }}
    >
      <StyledToolbar>
        <IconButton edge="start" color="inherit" aria-label="back" onClick={handleBackClick}>
          <ArrowBack />
        </IconButton>
        <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <SearchBarContainer open={open}>
          <SearchIconWrapper>
            <IconButton
              color="inherit"
              onClick={handleSearchClick}
              aria-label="search"
            >
              <Search />
            </IconButton>
          </SearchIconWrapper>
          {open && (
            <StyledInputBase
              placeholder="Search…"
              value={inputValue}
              onChange={handleInputChange}
              inputProps={{ 'aria-label': 'search' }}
            />
          )}
        </SearchBarContainer>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
