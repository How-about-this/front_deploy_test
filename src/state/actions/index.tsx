'use client'

export const approve = () => ({
    type: 'APPROVE_USER',
});

export const deny = () => ({
    type: 'DENY_USER',
});

export const setTeamMode = () => ({
    type: 'SET_TEAM_MODE',
});

export const setSingleMode = () => ({
    type: 'SET_SINGLE_MODE',
});

export const setMatchingModalOpen = () => ({
    type: 'SHOW_MODAL',
});

export const setMatchingModalClose = () => ({
    type: 'CLOSE_MODAL',
});

