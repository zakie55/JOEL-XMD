import setEnvCommand from '../setvar.js';
import config from '../../config.cjs';
const sudoContact = async (m, gss) => {
    const sudonumber = config.SUDO_NUMBER;
    const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();

    if (cmd === 'sudo') {
        try {
            await gss.sendContact(m.from, [sudonumber], m);
            await m.React("😁");
        } catch (error) {
            console.error('Error sending owner contact:', error);
            m.reply('Error sending owner contact.');
            await m.React("🙆‍♂️");
        }
    } else if (cmd === 'setenv') {
        const args = text.split(' ');
        await setEnvCommand(m, args);
    }
};

export default ownerContact;
