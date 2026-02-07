// Parse LRC file format
export interface LyricWord {
  time: number; // in seconds
  word: string;
}

export interface LyricLine {
  time: number;
  words: LyricWord[];
  fullText: string;
}

function parseLRCTime(timeStr: string): number {
  const match = timeStr.match(/(\d+):(\d+\.\d+)/);
  if (!match) return 0;
  const minutes = parseInt(match[1]);
  const seconds = parseFloat(match[2]);
  return minutes * 60 + seconds;
}

export function parseLRC(lrcContent: string): LyricLine[] {
  const lines = lrcContent.split('\n');
  const lyrics: LyricLine[] = [];

  for (const line of lines) {
    // Skip metadata and empty lines
    if (!line.trim() || line.startsWith('[ti:') || line.startsWith('[ar:') || 
        line.startsWith('[al:') || line.startsWith('[length:')) {
      continue;
    }

    // Match line timestamp and content
    const lineMatch = line.match(/\[(\d+:\d+\.\d+)\](.+)/);
    if (!lineMatch) continue;

    const lineTime = parseLRCTime(lineMatch[1]);
    const content = lineMatch[2];

    // Parse word-level timestamps
    const words: LyricWord[] = [];
    const wordMatches = content.matchAll(/<(\d+:\d+\.\d+)>([^<]+)/g);
    
    for (const match of wordMatches) {
      const wordTime = parseLRCTime(match[1]);
      const word = match[2].trim();
      if (word && word !== '[Intro]') {
        words.push({ time: wordTime, word });
      }
    }

    // If no word-level timestamps, just use the line
    if (words.length === 0) {
      const text = content.replace(/<\d+:\d+\.\d+>/g, '').trim();
      if (text && !text.startsWith('[')) {
        words.push({ time: lineTime, word: text });
      }
    }

    if (words.length > 0) {
      const fullText = words.map(w => w.word).join(' ');
      lyrics.push({ time: lineTime, words, fullText });
    }
  }

  return lyrics;
}

// The parsed lyrics
export const lyrics = parseLRC(`[ti:Julia Michaels - Issues (Lyrics)]
[ar:Cakes & Eclairs]
[al:Julia Michaels - Issues (Lyrics)]
[length:03:51]

[00:08.58]<00:08.58>[Intro]
[00:08.58]<00:08.58>I'm <00:08.82>jealous, <00:10.16>I'm <00:10.44>overzealous
[00:12.74]<00:12.74>When <00:12.90>I'm <00:13.04>down, <00:13.34>I <00:13.42>get <00:13.58>real <00:13.84>down
[00:14.84]<00:14.84>When <00:14.98>I'm <00:15.10>high, <00:15.44>I <00:15.48>don't <00:15.62>come <00:15.90>down
[00:16.92]<00:16.92>I <00:17.12>get <00:17.32>angry, <00:18.56>baby, <00:19.26>believe <00:19.80>me
[00:21.14]<00:21.14>I <00:21.24>could <00:21.42>love <00:21.74>you <00:21.84>just <00:21.98>like <00:22.24>that
[00:23.14]<00:23.14>And <00:23.28>I <00:23.34>could <00:23.52>leave <00:23.82>you <00:23.92>just <00:24.10>as <00:24.30>fast
[00:25.50]<00:25.50>But <00:25.74>you <00:26.24>don't <00:27.78>judge <00:28.38>me
[00:29.18]<00:29.18>'Cause <00:29.48>if <00:29.64>you <00:29.88>did, <00:30.38>baby, <00:30.94>I <00:31.14>would <00:31.72>judge <00:31.76>you <00:32.00>too
[00:33.90]<00:33.90>No, <00:34.12>you <00:34.62>don't <00:36.20>judge <00:36.80>me
[00:37.60]<00:37.60>'Cause <00:37.88>if <00:38.04>you <00:38.30>did, <00:38.82>baby, <00:39.42>I <00:39.64>would <00:39.88>judge <00:40.15>you <00:40.36>too
[00:41.76]<00:41.76>'Cause <00:42.00>I <00:42.16>got <00:42.40>issues
[00:43.66]<00:43.66>But <00:43.82>you <00:44.06>got <00:44.29>'em <00:44.46>too
[00:45.96]<00:45.96>So <00:46.14>give <00:46.42>'em <00:46.60>all <00:46.96>to <00:47.10>me
[00:47.52]<00:47.52>And <00:48.02>I'll <00:48.13>give <00:48.16>mine <00:48.52>to <00:48.72>you
[00:50.06]<00:50.06>Bask <00:50.44>in <00:50.64>the <00:50.76>glory
[00:52.18]<00:52.18>Of <00:52.31>all <00:52.48>our <00:52.82>problems
[00:54.50]<00:54.50>'Cause <00:54.76>we <00:54.98>got <00:55.36>the <00:55.52>kind <00:55.90>of <00:56.10>love
[00:56.46]<00:56.46>It <00:56.60>takes <00:56.90>to <00:57.12>solve <00:57.60>'em
[00:58.68]<00:58.68>Yeah, <00:58.92>I <00:58.94>got <00:59.20>issues
[01:01.78]<01:01.78>And <01:01.94>one <01:02.10>of <01:02.22>them <01:02.36>is <01:02.50>how <01:02.68>bad <01:02.88>I <01:03.00>need <01:03.36>you
[01:04.72]<01:04.72>You <01:04.86>do <01:05.12>shit <01:05.52>on <01:05.70>purpose
[01:07.30]<01:07.30>You <01:07.44>get <01:07.74>mad <01:08.02>and <01:08.16>you <01:08.28>break <01:08.54>things
[01:09.60]<01:09.60>Feel <01:09.90>bad, <01:10.14>try <01:10.26>to <01:10.40>fix <01:10.70>things
[01:11.18]<01:11.18>But <01:11.70>you're <01:11.94>perfect
[01:13.22]<01:13.22>Poorly <01:13.56>wired <01:14.12>circuit
[01:15.72]<01:15.72>And <01:15.86>got <01:16.14>hands <01:16.44>like <01:16.60>an <01:16.76>ocean
[01:17.96]<01:17.96>Push <01:18.16>you <01:18.28>out, <01:18.54>pull <01:18.70>you <01:18.84>back <01:19.14>in
[01:20.20]<01:20.20>'Cause <01:20.48>you <01:20.98>don't <01:22.52>judge <01:23.10>me
[01:23.96]<01:23.96>'Cause <01:24.24>if <01:24.40>you <01:24.60>did, <01:25.14>baby, <01:25.78>I <01:25.88>would <01:26.22>judge <01:26.46>you <01:26.72>too
[01:28.60]<01:28.60>No, <01:28.88>you <01:29.40>don't <01:30.94>judge <01:31.50>me
[01:32.44]<01:32.44>'Cause <01:32.78>you <01:32.98>see <01:33.26>it <01:33.56>from <01:34.08>the <01:34.34>same <01:34.60>point <01:34.92>of <01:35.10>view
[01:36.50]<01:36.50>'Cause <01:36.78>I <01:36.88>got <01:37.22>issues
[01:38.38]<01:38.38>But <01:38.54>you <01:38.80>got <01:39.03>'em <01:39.18>too
[01:40.70]<01:40.70>So <01:40.86>give <01:41.14>'em <01:41.30>all <01:41.70>to <01:41.84>me
[01:42.22]<01:42.22>And <01:42.60>I'll <01:42.86>give <01:42.90>mine <01:43.26>to <01:43.46>you
[01:44.82]<01:44.82>Bask <01:45.18>in <01:45.38>the <01:45.50>glory
[01:46.94]<01:46.94>Of <01:47.15>all <01:47.22>our <01:47.56>problems
[01:49.24]<01:49.24>'Cause <01:49.50>we <01:49.72>got <01:50.12>the <01:50.26>kind <01:50.64>of <01:50.90>love
[01:51.20]<01:51.20>It <01:51.34>takes <01:51.66>to <01:51.84>solve <01:52.34>'em
[01:53.40]<01:53.40>Yeah, <01:53.58>I <01:53.70>got <01:53.94>issues
[01:56.54]<01:56.54>And <01:56.68>one <01:56.84>of <01:56.94>them <01:57.10>is <01:57.24>how <01:57.42>bad <01:57.60>I <01:57.72>need <01:58.10>you
[01:58.72]<01:58.72>(I got issues, you got 'em too)
[02:04.98]<02:04.98>And <02:05.18>one <02:05.34>of <02:05.36>them <02:05.52>is <02:05.66>how <02:05.86>bad <02:06.12>I <02:06.14>need <02:06.52>you
[02:07.18]<02:07.18>(I got issues, you got 'em too)
[02:14.41]<02:14.41>'Cause <02:14.66>I <02:14.80>got <02:15.08>issues
[02:16.05]<02:16.05>(I got)
[02:16.30]<02:16.30>But <02:16.44>you <02:16.68>got <02:16.92>'em <02:17.08>too
[02:18.58]<02:18.58>So <02:18.76>give <02:18.96>'em <02:19.18>all <02:19.58>to <02:19.72>me
[02:20.04]<02:20.04>(You got 'em too)
[02:20.23]<02:20.23>And <02:20.36>I'll <02:20.60>give <02:20.78>mine <02:21.12>to <02:21.34>you
[02:22.72]<02:22.72>Bask <02:23.08>in <02:23.28>the <02:23.40>glory
[02:24.76]<02:24.76>(I got issues)
[02:25.03]<02:25.03>Of <02:25.03>all <02:25.30>our <02:25.42>problems
[02:27.12]<02:27.12>'Cause <02:27.38>we <02:27.60>got <02:27.84>the <02:28.14>kind <02:28.54>of <02:28.74>love
[02:29.07]<02:29.07>(You got 'em too)
[02:29.10]<02:29.10>It <02:29.24>takes <02:29.54>to <02:29.74>solve <02:30.22>'em
[02:31.28]<02:31.28>Yeah, <02:31.46>I <02:31.60>got <02:31.82>issues
[02:32.66]<02:32.66>(I got)
[02:34.40]<02:34.40>And <02:34.58>one <02:34.74>of <02:34.84>them <02:34.98>is <02:35.14>how <02:35.30>bad <02:35.50>I <02:35.62>need <02:35.98>you
[02:37.18]<02:37.18>(You got 'em too)
[02:39.70]<02:39.70>Yeah, <02:39.90>I <02:40.00>got <02:40.24>issues
[02:40.93]<02:40.93>(I got issues)
[02:42.86]<02:42.86>And <02:43.08>one <02:43.34>of <02:43.46>them <02:43.47>is <02:43.54>how <02:43.74>bad <02:43.92>I <02:44.04>need <02:44.40>you
[02:46.14]<02:46.14>(You got 'em too)
[02:48.12]<02:48.12>Yeah, <02:48.30>I <02:48.40>got <02:48.64>issues
[02:51.20]<02:51.20>(I got)
[02:51.24]<02:51.24>And <02:51.42>one <02:51.58>of <02:51.68>them <02:51.84>is <02:51.98>how <02:52.16>bad <03:28.66>I <03:28.94>need <03:33.36>you`);
