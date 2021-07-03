import React, { useState }  from 'react';
import TagSection from './TagsSections/TagsSections';
import DropdownArrow from '../UI/DropdownArrow/DropdownArrow';
import classes from './Tags.module.css';

const Tags = (props) => {
    //jscs:disable maximumLineLength
    const tags = {
      decade: ['1920', '1930', '1940', '1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020'],
      nature: ['natural', 'supernatural', 'ambiguous'],
      where: ['amazon prime','arrow','netflix','now tv','shudder','sky go'],
      theme: {
            nationality: ['french', 'german', 'italian', 'japanese', 'korean', 'spanish'],
            format: ['anthology', 'animated',  'mockumentary', 'found-footage', 'short'],
            stylised: ['artsy', 'campy', 'gothic', 'folk', 'giallo', 'teen', 'throwback', 'low budget', 'punk', 'splatter', 'surreal', 'ultraviolence'],
            subgenre: ['action', 'comedy', 'crime', 'disaster', 'fantasy', 'musical', 'mystery', 'psychological', 'romance',  'sci-fi', 'western'],
            lists:['top 100', 'hidden gem'],
            creator: ['cronenberg', 'fulci', 'hitchcock', 'hp lovecraft', 'stephen king', 'wes craven'],
            setting: ['apocalypse', 'christmas', 'dystopian', 'halloween', 'historic', 'holiday', 'road', 'space', 'the woods', 'time play', 'tundra', 'vacation', 'war'],
            threat: ['animal', 'cannibal', 'clown', 'creepy kids', 'cult', 'demon', 'devil', 'dolls', 'haunting',  'kaiju',  'mad scientist', 'monster', 'nazi', 'psycho-biddy', 'poltergeist', 'possession', 'redneck', 'serial killer', 'shark', 'slasher', 'vampire', 'werewolf', 'zombie'],
            other: ['ballet', 'body horror', 'catholicism', 'conspiracy', 'female lead', 'home invasion',  'hostage', 'hidden gem', 'identity', 'invasion', 'isolation', 'meta', 'obsession', 'occult', 'pandemic', 'paranoia', 'psychic', 'religion',  'revenge', 'sexual', 'torture porn'],
          },
    };

    //jscs:enable maximumLineLength

    //jscs:disable disallowArrayDestructuringReturn
    let [dropdownShow, toggle] = useState(false);
    let section = [classes.Section];
    if (dropdownShow) {
      section.push(classes.SeeLess);
    } else {
      section.push(classes.SeeMore);
    }

    return (<div>
            <TagSection
                tags={tags.decade}
                name='decade'
                tagGroup='decade'
                search={props.search}
                clicked={props.clicked} />
            <TagSection
                tags={tags.nature}
                name='nature'
                tagGroup='nature'
                search={props.search}
                clicked={props.clicked} />
            <TagSection
                  tags={tags.where}
                  name='where to watch'
                  tagGroup='where'
                  search={props.search}
                  clicked={props.clicked} />
            <p onClick={() => toggle(dropdownShow = !dropdownShow)} style={{ cursor: 'pointer' }}>
                themes
                <DropdownArrow seeMore={dropdownShow}/></p>
            <div className={section.join(' ')} style={{ marginLeft: '30px' }}>
                    <TagSection
                        tags={tags.theme.nationality}
                        name='nationality'
                        tagGroup='theme'
                        search={props.search}
                        clicked={props.clicked} />
                    <TagSection
                        tags={tags.theme.format}
                        name='format'
                        tagGroup='theme'
                        search={props.search}
                        clicked={props.clicked} />
                    <TagSection
                        tags={tags.theme.stylised}
                        name='stylised'
                        tagGroup='theme'
                        search={props.search}
                        clicked={props.clicked} />
                    <TagSection
                        tags={tags.theme.subgenre}
                        name='subgenre'
                        tagGroup='theme'
                        search={props.search}
                        clicked={props.clicked} />
                    <TagSection
                        tags={tags.theme.creator}
                        name='creator'
                        tagGroup='theme'
                        search={props.search}
                        clicked={props.clicked} />
                    <TagSection
                        tags={tags.theme.setting}
                        name='setting'
                        tagGroup='theme'
                        search={props.search}
                        clicked={props.clicked} />
                    <TagSection
                        tags={tags.theme.threat}
                        name='threat'
                        tagGroup='theme'
                        search={props.search}
                        clicked={props.clicked} />
                    <TagSection
                        tags={tags.theme.other}
                        name='other'
                        tagGroup='theme'
                        search={props.search}
                        clicked={props.clicked} />
            </div>
    </div>);
  };

export default Tags;
