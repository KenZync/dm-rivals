export const usePlayer = () => {
    return useState('player', () => '')
}

export const useRivals = () => {
    return useState('rivals', () => [])
}