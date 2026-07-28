declare module "mammoth/mammoth.browser" {
  export type ExtractRawTextResult = {
    value: string;
    messages: Array<{ type: string; message: string }>;
  };

  const mammoth: {
    extractRawText(input: { arrayBuffer: ArrayBuffer }): Promise<ExtractRawTextResult>;
  };

  export default mammoth;
}
