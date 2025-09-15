# in root directory run like this  sh ./pipeline/collect-commits.sh {revision hash} {branch name}
# example:  sh ./pipeline/collect-commits.sh 1f769ae334beacc5ad5888ae7ec1474b572487f8 dev
#
# revision should be the last inserted commit hash in the inner repo
git pull origin $2

git format-patch -o ../patches $1..$2

mkdir -p ../zipped

tar -czf ../zipped/patches.tar.gz ../patches/