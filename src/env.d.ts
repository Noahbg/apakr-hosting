export interface Env {
	ApakrFiles: KVNamespace;
	SaveKVStore?: (storePath?: string, force?: boolean) => Promise<void>;
}
