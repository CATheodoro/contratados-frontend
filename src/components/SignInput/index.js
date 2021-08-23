import React from 'react';

import {InputArea, Input} from './styles';

export default ({IconSvg, placeholder, value, onChangeText, password, keyboardType, onEndEditing, multiline}) => {
    return (
        <InputArea>
            <IconSvg width="24" height="24" fill="#268596" />
            <Input
                placeholder={placeholder}
                placeholderTextColor="#268596"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry = {password}
                keyboardType = {keyboardType}
                onEndEditing = {onEndEditing}
                multiline={multiline}
            />
        </InputArea>
    );
}