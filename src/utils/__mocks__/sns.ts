export const SNSHelper = {
    async publish(topicArn: string, message: any): Promise<string | null> {
    return Promise.resolve('sns publish mock')
  },
    async createTopic(name: string): Promise<string | null> {
    return Promise.resolve('sns create topic mock')
  }
}
