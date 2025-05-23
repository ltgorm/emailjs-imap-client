import {
  LOG_LEVEL_ERROR,
  LOG_LEVEL_WARN,
  LOG_LEVEL_INFO,
  LOG_LEVEL_DEBUG
} from './common'

let SESSIONCOUNTER = 0

export default function createDefaultLogger (username, hostname, _logger = console) {
  const session = ++SESSIONCOUNTER
  const log = (level, messages) => {
    messages = messages.map(msg => typeof msg === 'function' ? msg() : msg)
    const date = new Date().toISOString()
    const logMessage = `[${date}][${session}][${username}][${hostname}] ${messages.join(' ')}`
    if (level === LOG_LEVEL_DEBUG) {
      _logger.debug(logMessage)
    } else if (level === LOG_LEVEL_INFO) {
      _logger.info(logMessage)
    } else if (level === LOG_LEVEL_WARN) {
      _logger.warn(logMessage)
    } else if (level === LOG_LEVEL_ERROR) {
      _logger.error(logMessage)
    }
  }

  return {
    debug: msgs => log(LOG_LEVEL_DEBUG, msgs),
    info: msgs => log(LOG_LEVEL_INFO, msgs),
    warn: msgs => log(LOG_LEVEL_WARN, msgs),
    error: msgs => log(LOG_LEVEL_ERROR, msgs)
  }
}
