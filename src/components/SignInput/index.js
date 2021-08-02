import React from 'react';
import styled from 'styled-components/native';

const InputArea = styled.View`
    margin-left: 20px;
    margin-right: 20px;
    background-color: #FFFFFF;
    flex-direction: row;
    border-radius: 15px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
    border: 1px solid #63C2D1;
`;

const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #268596;
    margin-left: 10px;
`;

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