# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
    # Define the box to use
    config.vm.box = "bento/centos-8"
  
    # Define private network IP
    config.vm.network "private_network", ip: "192.168.33.10"
  
    # Use VirtualBox as provider
    config.vm.provider "virtualbox" do |vb|
      vb.memory = "4096"
    end
  
    # Folder synchronization
    config.vm.synced_folder ".", "/vagrant", type: "virtualbox"
  
    # Provisioning scripts
    config.vm.provision "shell", privileged: true, inline: <<-SHELL
      # Modify the repo settings to use CentOS Vault
      sudo sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-Linux-*
      sudo sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-Linux-*
  
      # Update the system
      sudo dnf -y update
  
      # Transition to CentOS Stream if necessary (optional, remove if staying with CentOS Linux 8)
      sudo dnf --disablerepo '*' --enablerepo extras swap centos-linux-repos centos-stream-repos -y
      sudo dnf distro-sync -y
  
      # Install Development Tools    
      sudo dnf install -y git python3 postgresql-devel gcc-c++
      sudo ln -sf /usr/bin/python3 /usr/bin/python
  
      # Docker installation
      sudo dnf config-manager --add-repo=https://download.docker.com/linux/centos/docker-ce.repo
      sudo dnf install -y docker-ce docker-ce-cli containerd.io
      sudo systemctl start docker
      sudo systemctl enable docker
      sudo usermod -aG docker $USER
  
      # Docker Compose installation
      sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
      sudo chmod +x /usr/local/bin/docker-compose
      mkdir /vagrant/node_modules
      mkdir ~/vagrant_node_modules
      sudo mount --bind ~/vagrant_node_modules /vagrant/node_modules
    SHELL
  
    config.vm.provision "shell", privileged: false, inline: <<-SHELL
    # Install NVM
    git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
    source ~/.nvm/nvm.sh
    echo "source ~/.nvm/nvm.sh" >> ~/.bashrc
  
    # Install Node
    echo "Installing Node.js (please be patient)"
    nvm install 18.14.0 &> /dev/null
    nvm use 18.14.0
    nvm alias default 18.14.0
  
    # install project dependencies and build
    cd /home/vagrant
    git clone https://github.com/xpan1c/prueba-tecnica-backend-master.git
    echo "Installing local node.js packages... (please be patient)"
    npm install
    # see package.json for respective build task
    docker compose up -d
    SHELL
  end