const Helpers = {
  dataToBytes(data: any): number {
    return new TextEncoder().encode(JSON.stringify(data)).length
  }
}

export default Helpers
