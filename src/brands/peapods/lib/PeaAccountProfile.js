/* eslint-disable react/forbid-prop-types */
import Tab from '@material-ui/core/Tab/Tab';
import Tabs from '@material-ui/core/Tabs/Tabs';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';

import PeaButton from './PeaButton';
import PeaIcon from './PeaIcon';
import PeaAvatar from './PeaAvatar';
import PeaStatistic from './PeaStatistic';
import PeaText from './PeaTypography';
import PeaSocialAvatar from './PeaSocialAvatar';
import PeaTag from './PeaTag';
import PeaProfileEditor from './PeaProfileEditor';
import PeaUserSettings from './PeaUserSettings';
import PeaConfirmation from './PeaConfirmation';

// TODO: refactor this to use PeaSwipeableTabs

const PeaAccountProfile = ({
  isCurrentUser,
  cover,
  image,
  name,
  userName,
  email,
  phoneNumber,
  bio,
  location,
  locationInput,
  birthday,
  age,
  gender,
  groups,
  tags,
  podsCount,
  reputation,
  followersCount,
  followingCount,
  isPrivate,
  groupList,
  podList,
  onSubmit,
  editing,
  isUpdating,
  isDeleting,
  setEditing,
  onChangeCoverPhotoClicked,
  onChangeProfilePhotosClicked,
  deleteProfile,
  onCreateGroupClicked,
  onReport,
}) => {
  const [index, onChange] = useState(0);
  const [anchorEl, setAnchor] = useState(null);
  const [delModalOpen, setDelModalOpen] = useState(false);
  const open = Boolean(anchorEl);

  const onReportClick = () => {
    setAnchor(null);
    onReport();
  };

  if (editing) {
    return (
      <PeaProfileEditor
        cover={cover}
        image={image}
        name={name}
        userName={userName}
        email={email}
        phoneNumber={phoneNumber}
        tags={tags}
        bio={bio}
        location={location}
        locationInput={locationInput}
        birthday={birthday}
        gender={gender}
        isPrivate={isPrivate}
        onSubmit={onSubmit}
        isUpdating={isUpdating}
        onCancel={() => setEditing(false)}
        onChangeCoverPhotoClicked={onChangeCoverPhotoClicked}
        onChangeProfilePhotosClicked={onChangeProfilePhotosClicked}
      />
    );
  }
  const renderMenu = () => (
    <Menu
      id="long-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={() => setAnchor(null)}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        style: {
          minWidth: 240,
        },
      }}
    >
      <MenuItem onClick={() => setAnchor(null)}>
        <ListItemText disableTypography>
          <PeaText color={'error'} variant={'body1'} weight={'bold'}>
            Block {`@${userName}`}
          </PeaText>
        </ListItemText>
      </MenuItem>

      <Divider variant={'middle'} />

      <MenuItem onClick={onReportClick}>
        <ListItemText disableTypography>
          <PeaText color={'error'} variant={'body1'} weight={'bold'}>
            Report {`@${userName}`}
          </PeaText>
        </ListItemText>
      </MenuItem>
    </Menu>
  );

  return (
    <Card className={'PeaAccountProfile-root'}>
      <CardMedia className={'MuiCardMedia-root'} image={cover} />
      <CardContent className={'MuiCardContent-root'}>
        <Grid container justify={'space-between'} spacing={2}>
          <Grid item style={{ height: 0 }}>
            <PeaAvatar className={'MuiAvatar-root-profilePic'} src={image} />
          </Grid>
          <Hidden only={'xs'}>
            <Grid item>
              <PeaStatistic label={'Pods'} value={podsCount} />
            </Grid>
            <Grid item>
              <PeaStatistic label={'Following'} value={followingCount} />
            </Grid>
            <Grid item>
              <PeaStatistic label={'Followers'} value={followersCount} />
            </Grid>
          </Hidden>
          <Grid item className={'MuiGrid-item -reputation'}>
            <PeaText color={'secondary'} weight={'bold'} align={'center'}>
              Reputation: {reputation}
            </PeaText>
          </Grid>
        </Grid>

        <Box mt={4} mb={3}>
          <Grid className={'MuiGrid-container -actions'} container spacing={1}>
            <Grid item>
              {isCurrentUser ? (
                <>
                  <PeaUserSettings
                    onNotificationsChange={() => {}}
                    onReceiveEmailChange={() => {}}
                    onEditProfile={() => setEditing(true)}
                    onContactSupport={() => {}}
                    onLogout={() => {}}
                    onDeleteProfile={() => setDelModalOpen(true)}
                  />
                  <PeaConfirmation
                    title={'Delete Account'}
                    content={'Are you sure?'}
                    submitLabel={'Delete'}
                    open={delModalOpen}
                    onClose={() => setDelModalOpen(false)}
                    onSubmit={() => deleteProfile()}
                    submitting={isDeleting}
                  />
                </>
              ) : (
                <PeaButton
                  variant={'contained'}
                  color={'primary'}
                  size={'small'}
                >
                  Follow
                </PeaButton>
              )}
            </Grid>
            {!isCurrentUser && (
              <>
                <Grid item>
                  <PeaButton
                    variant={'outlined'}
                    color={'primary'}
                    size={'small'}
                  >
                    Invite
                  </PeaButton>
                </Grid>
                <Grid item>
                  <PeaButton icon={'email'} size={'small'} shape={'circular'}>
                    message
                  </PeaButton>
                </Grid>
                <Grid item>
                  <PeaButton
                    icon={'more_vert'}
                    size={'small'}
                    shape={'circular'}
                    onClick={e => setAnchor(e.currentTarget)}
                  >
                    more
                  </PeaButton>
                  {renderMenu()}
                </Grid>
              </>
            )}
          </Grid>
        </Box>

        <Hidden smUp>
          <Grid container justify={'space-evenly'}>
            <Grid item>
              <PeaStatistic label={'Pods'} value={podsCount} />
            </Grid>
            <Grid item>
              <PeaStatistic label={'Following'} value={48} />
            </Grid>
            <Grid item>
              <PeaStatistic label={'Followers'} value={5} />
            </Grid>
          </Grid>
          <br />
        </Hidden>

        <Hidden only={'xs'}>
          <div style={{ marginTop: -32 }} />
        </Hidden>

        <PeaText variant={'h5'} weight={'bold'}>
          {name}
        </PeaText>

        <PeaText gutterBottom>{`@${userName}`}</PeaText>
        <br />

        <Grid container wrap={'nowrap'} spacing={1}>
          <Grid item>
            <PeaIcon color={'secondary'} size={'small'}>
              info
            </PeaIcon>
          </Grid>
          <Grid item>
            <PeaText gutterBottom>{bio}</PeaText>
          </Grid>
        </Grid>
        <Grid container wrap={'nowrap'} spacing={1}>
          <Grid item>
            <PeaIcon color={'secondary'} size={'small'}>
              location_on
            </PeaIcon>
          </Grid>
          <Grid item>
            <PeaText gutterBottom>
              {location ? location.formattedAddress : 'Unknown'}
            </PeaText>
          </Grid>
        </Grid>
      </CardContent>

      <Tabs
        className={'MuiTabs-root'}
        variant={'fullWidth'}
        centered
        value={index}
        onChange={(e, val) => onChange(val)}
      >
        <Tab label="Pods" disableRipple />
        <Tab label="About" disableRipple />
        <Tab label="Groups" disableRipple />
      </Tabs>

      {index === 0 && <Box minHeight={500}>{podList}</Box>}

      {index === 1 && (
        <Box p={2} textAlign={'left'}>
          <PeaText gutterBottom variant={'subtitle1'} weight={'bold'}>
            About
          </PeaText>
          <PeaText gutterBottom>
            <PeaText link underline={'none'}>
              <b>Age :</b>
            </PeaText>{' '}
            {age}
          </PeaText>
          <PeaText gutterBottom>
            <PeaText link underline={'none'}>
              <b>Gender :</b>
            </PeaText>{' '}
            {gender}
          </PeaText>
          <PeaText link underline={'none'} gutterBottom>
            <b>Groups</b>
          </PeaText>
          <PeaText gutterBottom />
          <Grid container spacing={2}>
            {groups.map(item => (
              <Grid item key={item.name}>
                <PeaSocialAvatar {...item} />
              </Grid>
            ))}
          </Grid>
          <br />
          <PeaText link underline={'none'} gutterBottom>
            <b>Tags</b>
          </PeaText>
          <PeaText gutterBottom />
          <Grid container spacing={1}>
            {tags.map(item => (
              <Grid item key={item.label}>
                <PeaTag
                  color={'secondary'}
                  label={`#${item.label}`}
                  onClick={() => {}}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {index === 2 && (
        <Box minHeight={500} style={{ position: 'relative' }}>
          {groupList}
          <PeaIcon
            icon={'add'}
            bgColor={'lightPrimary'}
            size={'big'}
            inverted
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={onCreateGroupClicked}
          />
        </Box>
      )}
    </Card>
  );
};

PeaAccountProfile.propTypes = {
  image: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  userName: PropTypes.string,
  bio: PropTypes.string,
  location: PropTypes.object,
  locationInput: PropTypes.func,
  age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  birthday: PropTypes.string,
  gender: PropTypes.string,
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      src: PropTypes.string,
    }),
  ),
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  reputation: PropTypes.number,
  podsCount: PropTypes.number,
  isCurrentUser: PropTypes.bool,
  email: PropTypes.string,
  phoneNumber: PropTypes.string,
  followersCount: PropTypes.number,
  followingCount: PropTypes.number,
  isPrivate: PropTypes.bool,
  groupList: PropTypes.object,
  podList: PropTypes.object,
  editing: PropTypes.bool,
  isUpdating: PropTypes.bool,
  isDeleting: PropTypes.bool,
  onSubmit: PropTypes.func,
  setEditing: PropTypes.func,
  onChangeCoverPhotoClicked: PropTypes.func.isRequired,
  onChangeProfilePhotosClicked: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func,
  onCreateGroupClicked: PropTypes.func,
  onReport: PropTypes.func,
};

PeaAccountProfile.defaultProps = {
  userName: '',
  bio: '',
  location: undefined,
  locationInput: undefined,
  birthday: '',
  age: 'unknown',
  gender: '',
  groups: [],
  tags: [],
  reputation: 0,
  podsCount: 0,
  isCurrentUser: false,
  email: '',
  phoneNumber: '',
  followersCount: 0,
  followingCount: 0,
  isPrivate: false,
  editing: false,
  isUpdating: false,
  isDeleting: false,
  groupList: undefined,
  podList: undefined,
  onSubmit: () => {},
  setEditing: () => {},
  deleteProfile: () => {},
  onCreateGroupClicked: () => {},
  onReport: () => {},
};
PeaAccountProfile.metadata = {
  name: 'Pea Account Profile',
};
PeaAccountProfile.codeSandbox = 'https://codesandbox.io/s/zljn06jmq4';

export default PeaAccountProfile;