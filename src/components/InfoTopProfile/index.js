import React from 'react';
import { EmailProfileArea, InfoProfileArea, Linha } from '../../screens/styles/View';
import { ProfileAvatar, ProfileAvatarDefault } from '../../screens/styles/Image';
import { TextBold, TitleNameProfile } from '../../screens/styles/Text';

//Styles    ###########################################################



//Styles END ###########################################################


export default ({nome, email, image}) => {

    return (
        <>
            <InfoProfileArea>
                {image ?
                    <ProfileAvatar source={{uri: image}} />
                    :
                    <ProfileAvatarDefault/>
                }
                 <TitleNameProfile>{nome}</TitleNameProfile>
            </InfoProfileArea>
            
            <EmailProfileArea>
                <TextBold>{email}</TextBold>
            </EmailProfileArea>
            <Linha/>
    </>  

    );
}