export const convertFirebaseTimestamp = (timestamp) => {
  return new Date(timestamp.seconds * 1000).toLocaleTimeString()
}