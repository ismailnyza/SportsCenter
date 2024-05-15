const { spawn } = require('child_process');
const currentBranch = require('current-branch');

(async () => {
  const branchName = await currentBranch();

  // Branch Name Validation (Adjust as needed)
  const branchNameRegex = /^[a-z-]+$/;  // Allow lowercase letters and hyphens
  if (!branchNameRegex.test(branchName)) {
    console.error(`Invalid branch name format. Use only lowercase letters and hyphens.`);
    process.exit(1); // Exit with non-zero code to block commit
  }

  // Commit Message Prefix Validation
  const prefix = `${branchName}-`; // Adjust prefix format as needed
  const validateMessage = spawn('git', ['log', '-1', '--pretty=%B']);

  validateMessage.stdout.on('data', (data) => {
    const message = data.toString().trim();
    if (!message.startsWith(prefix)) {
      console.error(`Commit message must start with prefix: ${prefix}`);
      process.exit(1); // Exit with non-zero code to block commit
    }
  });
})();
