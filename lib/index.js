/**
 * dsh-preset-lite — 只贡献一个 agent preset 声明，自身不注册任何工具。
 * 预设声明走 cordis.patch.yml 的 - insert:（与官方 standard/ptc/minimal 同机制），
 * 因此 profile 里不必也不能再平铺一行，否则会造成 Duplicate agent preset。
 */
export const name = "dsh-preset-lite";
export default { apply() {} };
