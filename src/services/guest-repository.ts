const defaultGuests = [
  { email: 'gangnam-style@psy.com', tickets: 1 },
  { email: 'harlem.shake@baauer.com', tickets: 8 },
  { email: 'black.beatles@skrillex.com', tickets: 3 },
];
const KEY = 'recruit-project.guests';

export default class GuestRepository {
  load():Promise<GuestType[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        try {
          const json = localStorage.getItem(KEY);
          if (!json) throw 'no data found';
          resolve(JSON.parse(json));
        } catch (e) {
          resolve(defaultGuests);
        }
      }, 1000);
    });
  }
  save(guests:GuestType[]):Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        try {
          localStorage.setItem(KEY, JSON.stringify(guests));
        } catch (e) {
          // noop
        }
        resolve();
      }, 1000);
    });
  }
  reset():Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        localStorage.removeItem(KEY);
        resolve();
      }, 1000);
    });
  }
}

export type GuestType = {
  email: string,
  tickets: number
}
