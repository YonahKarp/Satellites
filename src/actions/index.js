
export const SET_TLE= 'SET_TLE';

export function setTle(tle) {
  return { 
      type: SET_TLE, 
      payload: {tle: tle} 
    }
}