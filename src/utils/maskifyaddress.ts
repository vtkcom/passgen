export function maskifyAddress(address: string, symbolsInStartPart = 15, symbolsInEndPart: number = 6) {
    if (!address) {
      address = '';
    }
  
    const initialPart = address.substring(0, symbolsInStartPart);
    const finalPart = address.substring(address.length - symbolsInEndPart);
    const ellipsis = '...';
  
    return initialPart + ellipsis + finalPart;
  }