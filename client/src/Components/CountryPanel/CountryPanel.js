import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AppContextConsumer } from '../../AppContext';
import CountryBorder from '../CountryBorder/CountryBorder';
import Note from '../Note/Note';
// import FriendList from '../Friends/FriendList';
import './CountryPanel.css';
import themeColors from '../themeColors.js';

const CountryPanel = () => {
  return (
    <AppContextConsumer>
      {value => {
        const currentTheme =
          value && value.AppState.user.preferences
            ? value.AppState.user.preferences.theme
            : 'standard';
        return value && value.AppState.currentCountry ? (
          <div
            style={{
              backgroundColor: themeColors.background[currentTheme],
              color: themeColors.color[currentTheme],
              border: `1px solid ${themeColors.borderColor[currentTheme]}`
            }}
            className={
              value.AppState.showingCountryPanel
                ? 'CountryPanel CountryPanel-open'
                : 'CountryPanel CountryPanel-closed'
            }
          >
            <div className="Card ">
              <div className="Card_Header">
                {value.AppState.currentCountry.info && (
                  <React.Fragment>
                    <span>{value.AppState.currentCountry.info.emoji}</span>
                    <h1>{value.AppState.currentCountry.info.name}</h1>
                  </React.Fragment>
                )}
                <FontAwesomeIcon
                  className="closeCountryPanelIcon"
                  onClick={value.closeCountryPanel}
                  icon="times"
                />
              </div>
              <CountryBorder
                geometry={
                  value.currentCountryInfo
                    ? value.currentCountryInfo.geometry
                    : null
                }
                closeCountryPanel={value.closeCountryPanel}
                handleSliderMove={value.handleSliderMove}
                handleScratched={value.handleScratched}
                currentCountryStatus={value.AppState.currentCountryStatus}
                scratched={value.AppState.currentCountry.scratched}
                preferences={value.AppState.user.preferences}
                currentTheme={currentTheme}
              />
              {value.AppState.currentCountry.scratched ? (
                <Note
                  country={value.AppState.currentCountry}
                  handleChangeNote={value.handleChangeNote}
                  handleUpdateNotes={value.handleUpdateNotes}
                  turnOnEditNote={value.turnOnEditNote}
                  currentCountryStatus={value.AppState.currentCountryStatus}
                  background={themeColors.background[currentTheme]}
                  color={themeColors.color[currentTheme]}
                  fontColor={themeColors.fontColor[currentTheme]}
                  borderColor={themeColors.borderColor[currentTheme]}
                />
              ) : null}
              {/* {value.AppState.user.facebook && */}
              {/* value.AppState.user.facebook.id ? ( */}
              {/*   <FriendList */}
              {/*     userFriends={value.AppState.currentCountry.friends} */}
              {/*     background={themeColors.background[currentTheme]} */}
              {/*     color={themeColors.color[currentTheme]} */}
              {/*     fontColor={themeColors.fontColor[currentTheme]} */}
              {/*     borderColor={themeColors.borderColor[currentTheme]} */}
              {/*   /> */}
              {/* ) : null} */}
            </div>
          </div>
        ) : null;
      }}
    </AppContextConsumer>
  );
};

export default CountryPanel;
