# koishi-plugin-arc-ai-chan

[![npm](https://img.shields.io/npm/v/koishi-plugin-arc-ai-chan?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-arc-ai-chan)

Arcaea AI 酱的复刻版。

在 Koishi 中安装该插件即可。

## 使用

考虑到趣味性，插件的功能由关键字而不是命令触发。

插件匹配的正则为 `AI酱.*(推荐|挑|随|换).*一首.*(曲子|歌)`，不区分大小写。凡是不超过 50 字符且能匹配该正则的发言均能触发 AI 酱。

示例：

```
AI酱，能帮我挑一首曲子吗？
AI酱我想换一首歌
ai酱挑一首曲子
ai酱挑一首歌
```

## License

`af2023.json` 及 `songlist.json` 为游戏数据，不适用该仓库的许可证。
